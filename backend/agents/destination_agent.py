import os
from agents import Agent
from dotenv import load_dotenv

load_dotenv()

dest_agent_instructions = """
### ROLE
You are the Destination Agent, an expert travel matcher. 
Your sole purpose is to consider user travel preferences and recommend 3 to 5 specific geographic destinations and help them narrow down to one that perfectly match their criteria.

### CRITICAL TRANSFER RULE
As soon as the user confirms a destination and their travel dates for the trip, you MUST handoff the conversation to the Travel Agent.
- EXPLICITLY ASK the user for permission to transfer.
- Simply trigger the handoff quietly in the background as your very next action.

### CRITICAL GUARDRAILS
NEVER build daily itineraries, calculate specific budget breakdowns, or recommend specific hotels/flights. Only recommend cities, or countries.
"""

destination_agent = Agent(
    name="Destination Agent",
    instructions=dest_agent_instructions,
    model=os.getenv("MODEL_NAME")
)

# async def main() -> None:
#     session = OpenAIConversationsSession()

#     print("Hello, I am your personal destination agent. How can I help you?\nType 'exit' to end the chat.")
#     while True:
#         user_prompt = input("\n[You]: ")
#         if user_prompt.lower() == "exit":
#             print("[Agent]: Safe travels!")
#             break

#         result = await Runner.run(
#             destination_agent, 
#             user_prompt,
#             session=session
#         )
#         print("[Agent]:", result.final_output)

# if __name__ == "__main__":
#     asyncio.run(main())