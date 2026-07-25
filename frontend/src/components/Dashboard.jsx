import Header from "./Header";
import TripPlannerWizard from "./TripPlannerWizard";

export default function Dashboard() {
  return (
    <div className="h-screen max-h-screen flex flex-col p-4 min-w-0 max-w-7xl w-full mx-auto bg-page">
      <Header />
      <main className="flex-1 min-h-0 w-full mt-8">
        <TripPlannerWizard />
      </main>
    </div>
  );
}