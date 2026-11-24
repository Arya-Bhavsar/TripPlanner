from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.destination_llm import DestinationList, find_destinations

import os
from dotenv import load_dotenv
import requests
import time

load_dotenv()

app = FastAPI(title="Trip Planner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# Pydantic model for the destination request
class DestinationRequest(BaseModel):
    prompt: str

# Endpoint to get recommended destinations based on user prompt
@app.post("/destinations")
def get_destinations(payload: DestinationRequest) -> DestinationList:
    cleaned_prompt = payload.prompt.strip()
    if not cleaned_prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    try:
        return find_destinations(cleaned_prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

# Pydantic model for the destination images request
class DestinationImageRequest(BaseModel):
    destinations: list[str] = Field(min_length=1)

# Pydantic model for destination images response
class DestinationImagesResponse(BaseModel):
    results: dict[str, list[str]] = Field(default_factory=dict)

# Endpoint to get images for a list of destinations
@app.post("/destinations/images")
def get_destination_images(payload: DestinationImageRequest) -> DestinationImagesResponse:
    PIXABAY_URL = "https://pixabay.com/api/"
    CACHE_TTL_SECONDS = 86400  # 24-hour cache required by Pixabay API

    # Implement caching to avoid redundant API calls
    if not hasattr(get_destination_images, "_cache"):
        get_destination_images._cache = {}
    cache: dict[tuple[str, str, str, str], tuple[float, list[str]]] = (
        get_destination_images._cache
    )

    cleaned = [d.strip() for d in payload.destinations if d and d.strip()]
    if not cleaned:
        raise HTTPException(status_code=400, detail="Destination list cannot be empty.")

    # Fetch images for each destination, using cache if available
    pixabay_api_key = os.getenv("PIXABAY_API_KEY")
    results: dict[str, list[str]] = {}
    now = time.time()
    try:
        for dest in cleaned:
            query = dest[:100]  # Limit query length to 100 characters
            cache_key = (
                query.lower(),
                "photo",
                "horizontal",
                "places",
            )

            # Check cache first
            cached = cache.get(cache_key)
            if cached and cached[0] > now:
                results[dest] = cached[1][:5]
                continue

            # Fetch images from Pixabay API
            response = requests.get(
                PIXABAY_URL,
                params={
                    "key": pixabay_api_key,
                    "q": query,
                    "image_type": "photo",
                    "orientation": "horizontal",
                    "category": "places",
                    "editors_choice": True,
                    "safesearch": "true",
                    "per_page": 5,
                },
                timeout=10,
            )
            response.raise_for_status()

            # Extract image URLs from the response
            hits = response.json().get("hits", [])
            image_urls = [hit["webformatURL"] for hit in hits if isinstance(hit, dict) and hit.get("webformatURL")][:5]

            # Cache the results with a timestamp
            cache[cache_key] = (now + CACHE_TTL_SECONDS, image_urls)
            results[dest] = image_urls         
        return DestinationImagesResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching images: {str(e)}")
