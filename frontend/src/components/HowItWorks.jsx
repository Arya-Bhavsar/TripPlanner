import Header from "./Header";

export default function HowItWorks() {
  return (
    <div className="h-screen max-h-screen flex flex-col p-4 min-w-0 max-w-7xl w-full mx-auto bg-page">
      <Header />

      {/* Title */}
      <div className="text-center mt-12 md:mt-20 font-display font-medium text-5xl md:text-8xl text-ink leading-[1.05] lowercase">
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

      {/* Content */}
    </div>
  );
}