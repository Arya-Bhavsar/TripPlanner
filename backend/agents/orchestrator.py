import asyncio
from agents import Runner, OpenAIConversationsSession

from destination_agent import destination_agent
from travel_agent import travel_agent
from stay_agent import stay_agent
from itinerary_agent import itinerary_agent
from budget_agent import budget_agent
from aggregator_agent import aggregator_agent

destination_agent.handoffs = [travel_agent, stay_agent, itinerary_agent]
travel_agent.handoffs = [budget_agent]
stay_agent.handoffs = [budget_agent]
itinerary_agent.handoffs = [budget_agent]
budget_agent.handoffs = [aggregator_agent]

async def main():
    session = OpenAIConversationsSession()

    print("================================")
    print("AI Trip Planner")
    print("================================")
    print("Type 'exit' to quit.\n")

    active_agent = destination_agent

    while True:
        user_prompt = input("\n[You]: ")
        if user_prompt.lower() == "exit":
            print("[Agent]: Safe travels!")
            break

        result = await Runner.run(
            active_agent,
            user_prompt,
            session=session
        )
        print(f"[Agent]: {result.final_output}")

        if result.last_agent.name != active_agent.name:
            print(f"[HANDOFF]: {active_agent.name} -> {result.last_agent.name}")

        active_agent = result.last_agent

if __name__ == "__main__":
    asyncio.run(main())