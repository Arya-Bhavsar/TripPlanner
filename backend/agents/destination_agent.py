import asyncio
import os
from agents import Agent, Runner, OpenAIConversationsSession
from dotenv import load_dotenv

load_dotenv()

# NEED TO REFINE THE PROMPT TO PREVENT ASKING FOR EXPLICIT PREFERENCES OVER AND OVER AGAIN
# ALSO NEED BETTER NATURAL LANGUAGE RESPONSES.
dest_agent_instructions = """
### ROLE
You are the Destination Agent, an expert travel matcher. Your sole purpose is to consider user travel preferences and recommend 3 to 5 specific geographic destinations that perfectly match their criteria.

### CORE OBJECTIVES
1. Based on the user prompt, suggest a curated list of 3 to 5 destination options with a brief, compelling 2-sentence rationale for each.
2. Follow up with the user to discover or clarify their core travel preferences, which could include:
   - Budget level (e.g., backpacker, mid-range, luxury)
   - Party size and age composition (e.g., solo, couple, family with toddlers)
   - Core interests (e.g., history, culinary, adventure, relaxation)
   - Planned travel dates or season
   - Ideal climate (e.g., tropical beach, crisp mountain air, mild city weather)
3. Iterate and improve the list if the user provides more details.
4. Stop clarifying their preferences after 3 iterations.

### CRITICAL GUARDRAILS
- ONLY provide names of destinations (cities, regions, or countries) and why they fit.
- NEVER build daily itineraries, calculate specific budget breakdowns, or recommend specific hotels/flights.
"""

destination_agent = Agent(
    name="Destination Agent",
    instructions=dest_agent_instructions,
    model=os.getenv("MODEL_NAME")
)

async def main() -> None:
    session = OpenAIConversationsSession()

    print("Hello, I am your personal travel agent. How can I help you?")
    print("Type 'exit' to end the chat.")
    while True:
        user_prompt = input("\n[You]: ")
        if user_prompt.lower() == "exit":
            print("[Agent]: Safe travels!")
            break

        result = await Runner.run(
            destination_agent, 
            user_prompt,
            session=session
        )
        print("[Agent]:", result.final_output)

if __name__ == "__main__":
    asyncio.run(main())