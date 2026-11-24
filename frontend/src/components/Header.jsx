import ThemeToggle from "./ThemeToggle";

export default function Header({ activeView, setActiveView }) {
  const isActive = (view) => activeView === view

  const navLinkClass = (view) => `text-medium cursor-pointer ${isActive(view) ? "text-accent font-extrabold" : "text-muted font-medium"}`;

  return (
    <header className="flex items-center justify-between py-6 bg-page">
      <div className="font-display text-2xl font-extrabold whitespace-nowrap text-ink">Trip Planner</div>
      <div className="flex items-center justify-center gap-12">
        <button
          onClick={() => setActiveView("home")}
          className={navLinkClass("home")}
        >
          Home
        </button>
        <button
          onClick={() => setActiveView("guide")}
          className={navLinkClass("guide")}
        >
          How It Works
        </button>
      </div>
      <ThemeToggle />
    </header >
  )
}