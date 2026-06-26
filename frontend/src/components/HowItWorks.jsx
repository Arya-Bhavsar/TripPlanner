import Header from "./Header";
import HorizontalStepper from "./HorizontalStepper";

export default function HowItWorks() {
  return (
    <div className="h-screen max-h-screen flex flex-col p-4 min-w-0 max-w-7xl w-full mx-auto bg-page">
      <Header />

      {/* Title */}
      <div className="text-center mt-12 font-display font-medium text-8xl text-ink tracking-normal leading-[1.05] lowercase">
        travel planning,
        <br />
        made <span className="italic text-accent">smart</span>
      </div>

      {/* Subtitle */}
      <p className="text-center mt-4 font-medium">
        An AI-powered application that uses specialized AI agents to handle the heavy lifting.
        <br />
        Organize your entire next trip all in one place.
      </p>

      {/* Content Header */}
      <div className="text-center mt-22 font-display font-extrabold tracking-wide text-6xl text-ink">
        Plan the{" "}<span className="italic text-accent">Entire</span>{" "}Trip from Stratch
      </div>

      {/* Horizontal Stepper */}
      <HorizontalStepper />
    </div>
  );
}