import { useState } from "react";
import Header from "./Header";
import TripPlannerWizard from "./TripPlannerWizard";
import HowItWorks from "./HowItWorks";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("home"); // "home" | "guide"

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="h-screen max-h-screen flex flex-col p-4 min-w-0 max-w-7xl w-full mx-auto bg-page">
      {/* Header */}
      <Header activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <main className="flex-1 min-h-0 w-full mt-8">
        {activeView === "home" ? (
          <TripPlannerWizard
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        ) : (
          <HowItWorks />
        )}
      </main>
    </div>
  );
}