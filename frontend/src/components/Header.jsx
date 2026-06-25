import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-10 bg-page">
      <div className="font-display text-2xl font-semibold whitespace-nowrap text-ink">Trip Planner</div>
      <ThemeToggle />
    </header>
  )
}