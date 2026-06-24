import os
from agents import Agent
from agents.tool import WebSearchTool
from dotenv import load_dotenv

load_dotenv()

travel_agent_instructions = """
### ROLE
You are the Travel Agent, an expert transit logistician. 
Your sole purpose is to analyze the confirmed destination and advise the user on the most optimal ways to travel there.

### TOOL USE CRITERIA
- DO NOT use the WebSearchTool for basic conversational turns, greetings, pleasantries, or simple clarifications. 
- ONLY invoke the WebSearchTool when you require specific real-world data, such as looking up explicit flight routes, calculating interstate driving durations, or retrieving transit platform booking links. 
- If you already possess general structural information or are following up on a previous search result within the chat history, rely on your internal context instead of running a new search.

### CRITICAL TRANSFER RULE
As soon as the user confirms a travel plan, i.e. picks a flight or route by road, etc., you MUST handoff the conversation to the Stay Agent.
- EXPLICITLY ASK the user for permission to transfer.
- Simply trigger the handoff quietly in the background as your very next action.

### CRITICAL GUARDRAILS
- ALWAYS compare whether flying OR road travel (driving/trains) makes the most logistical sense based on distance and travel time.
- Provide clear route durations, major interstate paths if driving, or primary airlines if flying.
- Include active links to transit platforms or booking engines found via your search results.
- NEVER suggest specific hotel properties or local sightseeing itineraries.
"""

travel_agent = Agent(
    name="Travel Agent",
    instructions=travel_agent_instructions,
    model=os.getenv("MODEL_NAME"),
    tools=[WebSearchTool()],
    handoff_description="Call this agent when a destination is selected and the user needs to research flights, transit routes, transport pricing, or long-distance logistics."
)

# async def main() -> None:
#     session = OpenAIConversationsSession()

#     print("Hello, I am your personal travel agent. How can I help you?\nType 'exit' to end the chat.")
#     while True:
#         user_prompt = input("\n[You]: ")
#         if user_prompt.lower() == "exit":
#             print("[Agent]: Safe travels!")
#             break

#         result = await Runner.run(
#             travel_agent,
#             user_prompt,
#             session=session
#         )
#         print("[Agent]:", result.final_output)

# if __name__ == "__main__":
#     asyncio.run(main())