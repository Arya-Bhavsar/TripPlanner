import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-page">
      <div className="font-display text-2xl font-semibold whitespace-nowrap text-ink">Trip Planner</div>
      <div className="flex items-center justify-center gap-12">
        <Link to="/" className="text-medium font-semibold text-ink cursor-pointer">Home</Link>
        <Link to="/guide" className="text-medium font-semibold text-ink cursor-pointer">How It Works</Link>
      </div>
      <ThemeToggle />
    </header>
  )
}