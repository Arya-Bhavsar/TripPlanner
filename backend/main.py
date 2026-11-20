from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.destination_llm import DestinationList, find_destinations

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

# Endpoint to get recommended destinations based on user prompt
@app.post("/destinations")
def get_destinations(prompt: str) -> DestinationList:
    cleaned_prompt = prompt.strip()
    if not cleaned_prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    try:
        return find_destinations(cleaned_prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

# Pydantic models for destination images response
class DestinationImages(BaseModel):
    destination: str
    images: list[str] = Field(default_factory=list, max_length=5)

class DestinationImagesResponse(BaseModel):
    results: list[DestinationImages] = Field()

# Endpoint to get images for a list of destinations
@app.post("/destinations/images")
def get_destination_images(destinations: list[str] = Body(embed=True, min_length=1)) -> DestinationImagesResponse:
    cleaned = [d.strip() for d in destinations if d and d.strip()]
    if not cleaned:
        raise HTTPException(status_code=400, detail="Destination list cannot be empty.")

    # Logic to fetch image using an API (Unsplash, Pexels, etc.)
