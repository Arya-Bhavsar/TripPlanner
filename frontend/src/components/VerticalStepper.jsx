import { useState } from 'react';
import DestinationStep from './DestinationStep';
import TransitStep from './TransitStep';
import AccommodationStep from './AccommodationStep';
import ItineraryStep from './ItineraryStep';
import CostStep from './CostStep';
import FinalPlan from './FinalPlan';

export default function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { number: "01", title: "Find the Destination", content: DestinationStep },
    { number: "02", title: "Plan the Transit", content: TransitStep },
    { number: "03", title: "Book Accommodations", content: AccommodationStep },
    { number: "04", title: "Create the Itinerary", content: ItineraryStep },
    { number: "05", title: "Optimize the Cost", content: CostStep },
    { number: "06", title: "The Final Plan", content: FinalPlan }
  ];

  const ActiveStepContent = steps[activeStep].content;

  return (
    <div className="w-full h-full max-w-7xl mx-auto pb-6">
      <div className="flex flex-row gap-12 items-start h-full">
        {/* Vertical Stepper */}
        <div className="shrink-0 flex flex-col justify-between h-full py-4 min-h-100">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div key={index} className="flex flex-col items-center flex-1 last:flex-none">
                {/* Step */}
                <button
                  onClick={() => setActiveStep(index)}
                  className="flex items-center gap-2 group focus:outline-none cursor-pointer"
                // disabled={!isPast && !isActive}
                >
                  <span className={`text-2xl font-display transition-colors duration-300 ${isPast || isActive ? "text-accent" : "text-muted group-hover:text-ink"}`}>
                    {step.number}
                  </span>
                </button>

                {/* Line */}
                {index !== steps.length - 1 && (
                  <div className={`w-0.5 flex-1 my-2 transition-colors duration-500 ${isPast ? "bg-accent" : "bg-line"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 w-full h-full overflow-y-auto pt-6">
          {/* Title */}
          <div className="text-center font-display font-medium text-5xl text-ink">
            {steps[activeStep].title}
          </div>

          {/* Content */}
          <ActiveStepContent />
        </div>
      </div>
    </div>
  );
}