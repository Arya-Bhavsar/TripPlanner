import asyncio
import os
from agents import Agent, Runner, OpenAIConversationsSession
from agents.tool import WebSearchTool
from dotenv import load_dotenv

load_dotenv()

travel_agent_instructions="""
### ROLE
You are the Travel Agent, an expert transit logistician. 
Your sole purpose is to analyze the confirmed destination and advise the user on the most optimal ways to travel there.

### CRITICAL GUARDRAILS
- ALWAYS use your WebSearch tool to evaluate whether flying OR road travel (driving/trains) makes the most logistical sense based on distance and travel time.
- Provide clear route durations, major interstate paths if driving, or primary airlines if flying.
- Include direct links to transit platforms or booking engines found via your search results.
- NEVER suggest specific hotel properties or local sightseeing itineraries.
"""

travel_agent = Agent(
    name="Travel Agent",
    instructions=travel_agent_instructions,
    model=os.getenv("MODEL_NAME"),
    tools=[WebSearchTool()]
)

async def main() -> None:
    session = OpenAIConversationsSession()

    print("Hello, I am your personal travel agent. How can I help you?\nType 'exit' to end the chat.")
    while True:
        user_prompt = input("\n[You]: ")
        if user_prompt.lower() == "exit":
            print("[Agent]: Safe travels!")
            break

        result = await Runner.run(
            travel_agent,
            user_prompt,
            session=session
        )
        print("[Agent]:", result.final_output)

if __name__ == "__main__":
    asyncio.run(main())