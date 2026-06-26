import { Link, useLocation } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `text-medium cursor-pointer ${isActive(path) ? "text-accent font-extrabold" : "text-muted font-medium"}`;

  return (
    <header className="flex items-center justify-between py-6 bg-page">
      <div className="font-display text-2xl font font-extrabold whitespace-nowrap text-ink">Trip Planner</div>
      <div className="flex items-center justify-center gap-12">
        <Link to="/" className={navLinkClass("/")}>Home</Link>
        <Link to="/guide" className={navLinkClass("/guide")}>How It Works</Link>
      </div>
      <ThemeToggle />
    </header >
  )
}