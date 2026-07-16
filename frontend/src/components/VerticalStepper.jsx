import { useState } from 'react';

export default function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01"
    },
    {
      number: "02"
    },
    {
      number: "03"
    },
    {
      number: "04"
    },
    {
      number: "05"
    },
    {
      number: "06"
    }
  ];

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-6 pb-6">
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
        <div className="flex-1 w-full">
          {/* Code here */}
        </div>
      </div>
    </div>
  );
}