import { useState } from 'react';
import { GlobeAmericas, Diagram3, ClipboardCheck, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function HorizontalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Select Destination",
      icon: <GlobeAmericas className="shrink-0 w-8 h-8 text-accent" />,
      description: "Browse for the perfect destination with the help of an AI agent. Chat with the agent, and it will find destinations that best match your preferences."
    },
    {
      number: "02",
      title: "Create Itinerary",
      icon: <Diagram3 className="shrink-0 w-8 h-8 text-accent" />,
      description: "Plan the transit to destination, book accomodations, and plan the itinerary all on our AI-powered application with the help of intelligent assistants."
    },
    {
      number: "03",
      title: "Optimize and Finalize",
      icon: <ClipboardCheck className="shrink-0 w-8 h-8 text-accent" />,
      description: "Get an estimated cost for the trip, and optimize the itinerary accordingly. Download a summary of the finalized plan."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-12">
      {/* Horizontal Stepper */}
      <div className="flex items-center justify-center w-full mb-12">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isPast = index < activeStep

          return (
            <div key={index} className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : "shrink-0"}`}>
              {/* Step */}
              <button
                onClick={() => setActiveStep(index)}
                className="flex items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <span className={`text-2xl font-display transition-colors duration-300 ${isPast || isActive ? "text-accent" : "text-muted group-hover:text-ink"}`}>
                  {step.number}
                </span>
              </button>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-4 transition-colors duration-500 ${isPast ? "bg-accent" : "bg-line"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Info Card */}
      <div className="flex gap-8 items-start max-w-3xl mx-auto rounded-2xl border border-line bg-surface p-10 transition-all duration-300">
        {/* Icon */}
        {steps[activeStep].icon}

        {/* Card Content */}
        <div className="flex-1 w-full">
          {/* Title */}
          <div className="text-2xl font-display font-bold mb-3 text-ink">
            {steps[activeStep].title}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted">
            {steps[activeStep].description}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              onClick={() => activeStep > 0 && setActiveStep(prev => prev - 1)}
              disabled={activeStep === 0}
              className="text-ink disabled:text-muted font-extrabold disabled:font-light"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => activeStep < steps.length - 1 && setActiveStep(prev => prev + 1)}
              disabled={activeStep === steps.length - 1}
              className="text-ink disabled:text-muted font-extrabold disabled:font-light"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}