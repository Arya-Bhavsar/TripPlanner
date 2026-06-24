import os
import httpx
from agents import Agent, function_tool
from agents.tool import WebSearchTool
from dotenv import load_dotenv

load_dotenv()

# Tool for the agent to get the weather conditions at the destination
### ONLY for the weather of the next 16 days.
@function_tool
async def get_destination_weather_for_dates(latitude: float, longitude: float, start_date: str, end_date: str) -> dict:
    """
    Fetches daily weather parameters (temperatures and rain probability) 
    for a destination city across a specific duration of trip dates.

    Args:
        latitude (float): The latitude coordinate of the destination city.
        longitude (float): The longitude coordinate of the destination city.
        start_date (str): The trip start date in 'YYYY-MM-DD' format.
        end_date (str): The trip end date in 'YYYY-MM-DD' format.
    """

    url = "https://api.open-meteo.com/v1/forecast"

    query_params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "temperature_2m_max, temperature_2m_min, precipitation_probability_max",
        "timezone": "auto"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=query_params, timeout=5.0)
            if response.status_code == 200:
                data = response.json()
                return data.get("daily", {})
            return {"error": f"API returned status code {response.status_code}"}
    except httpx.RequestError as e:
        return {"error": f"An error occurred while requesting weather data: {e}"}


# MIGHT NEED TO REFINE THE INSTRUCTIONS
itinerary_agent_instructions = """
### ROLE
You are the Itinerary Agent, a collaborative local guide and time manager. 
Your purpose is to discover excellent local attractions and carefully curate them into a realistic travel timeline based on direct user feedback.

### TWO-PHASE WORKFLOW
You must strictly execute your planning in two sequential phases:

1. PHASE 1: DISCOVERY & SELECTION (The Brainstorm)
   - Use the WebSearchTool to look up top-rated activities, hidden gems, landmarks, and restaurants for the given destination.
   - Account for the specific season/dates provided (e.g., recommend winter markets in December).
   - Present a clean, organized list of options grouped by category (e.g., Sightseeing, Food, Adventure).
   - STOP and ask the user explicitly which options they find interesting. Do not build a timeline yet.

2. PHASE 2: DATE-ACCURATE PLANNING (The Timeline)
   - Extract the specific trip dates from the conversation context.
   - If the trip dates are within the next 16 days, call `get_destination_weather_for_dates` to retrieve live forecast parameters. Adjust the timeline to match the conditions (e.g., matching activities to weather vibes, like indoor activities for heavy rain or outdoor ice-skating for light snow).
   - If the trip dates are further than 16 days out, DO NOT call the weather tool. Instead, rely on your internal knowledge of the destination's seasonal climate averages for that month to organize a balanced, historically safe itinerary.
   - Only explicitly mention the weather to the user if it directly alters or significantly enhances the context of your scheduling choices.
   - Build a realistic, day-by-day itinerary mapped to the user's specific trip dates (e.g., Friday, Oct 5th - Morning / Afternoon / Evening).

### TOOL USE CRITERIA
- DO NOT use the WebSearchTool for basic greetings, pleasantries, or when asking the user for their preferences in Phase 1.
- Use `WebSearchTool` to find spots and operational hours.
- Use `get_destination_weather` strictly at the start of Phase 2 to optimize your scheduling strategy.

### CRITICAL GUARDRAILS
- Do not explicitly mention Phase 1 and 2, prompt the user in natural language.
- Include active links to official attraction websites or ticket booking pages found via your search results.
- NEVER suggest hotel accommodations (leave that to the Stay Agent) or calculate flight dynamics.
"""

itinerary_agent = Agent(
    name="Itinerary Agent",
    instructions=itinerary_agent_instructions,
    model=os.getenv("MODEL_NAME"),
    tools=[
        WebSearchTool(),
        get_destination_weather_for_dates,
    ],
    handoff_description="Call this agent when a destination is selected and the user needs to plan day-by-day activities, or look up local attractions."
)

# async def main() -> None:
#     session = OpenAIConversationsSession()

#     print("Hello, I am your personal itinerary agent. How can I help you?\nType 'exit' to end the chat.")
#     while True:
#         user_prompt = input("\n[You]: ")
#         if user_prompt.lower() == "exit":
#             print("[Agent]: Safe travels!")
#             break

#         result = await Runner.run(
#             itinerary_agent,
#             user_prompt,
#             session=session
#         )
#         print("[Agent]:", result.final_output)

# if __name__ == "__main__":
#     asyncio.run(main())