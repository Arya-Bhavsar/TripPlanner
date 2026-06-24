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