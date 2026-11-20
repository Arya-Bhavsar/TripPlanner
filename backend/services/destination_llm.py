from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from pydantic import BaseModel, Field
import os
from dotenv import load_dotenv

load_dotenv()

instructions = """
You are a travel expert helping users discover destinations. Based on the user's preferences, vibe, or description, suggest 5 to 10 distinct, realistic destinations that fit what they are looking for.

Guidelines:
- Always return between 5 and 10 destinations.
- Offer a diverse mix of places while staying true to the user's intent.
- Keep descriptions concise and engaging so they fit cleanly on a discovery card.
- Suggest real places only and avoid guessing live prices or current availability.
- If the request is broad or minimal, curate a strong variety of popular and hidden-gem options rather than asking clarifying questions.
"""

# Output Schema for the destination llm call
class DestinationDetails(BaseModel):
    name: str = Field(description="City, region, or primary destination name")
    country: str = Field(description="Country where the destination is located")
    tagline: str = Field(description="Short punchy 4-8 word hook for the card header")
    summary: str = Field(description="Concise 1-2 sentence overview tailored to the user's vibe and preferences")
    best_season: str = Field(description="Ideal time of year to visit (e.g., 'Spring & Autumn')")
    tags: list[str] = Field(
        min_length=2,
        max_length=3,
        description="2-3 short scannable vibe/activity badges (e.g., ['Culture', 'Food', 'Temples'])",
    )

class DestinationList(BaseModel):
    destinations: list[DestinationDetails] = Field(
        min_length=5,
        max_length=10,
        description="List of 5 to 10 recommended destinations based on the user's preferences, vibe, or description"
    )

llm = ChatOpenAI(model_name=os.getenv("MODEL_NAME"))
structured_llm = llm.with_structured_output(DestinationList)

# Invokes the llm to find destination based on the user's prompt
def find_destinations(user_prompt: str) -> DestinationList:
    messages = [
        SystemMessage(content=instructions),
        HumanMessage(content=user_prompt)
    ]
    return structured_llm.invoke(messages)