import { useTheme } from "../ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="flex items-center cursor-pointer select-none">
      <span className="text-sm font-medium text-muted">
        {darkMode ? "Dark mode" : "Light mode"}
      </span>
      <div className={`ml-2.5 w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? "bg-accent" : "bg-line"}`}>
        <div className={`w-4 h-4 rounded-full shadow-md bg-page flex items-center justify-center transition-transform duration-300 ${darkMode ? "translate-x-4" : "translate-x-0"}`}>
          {darkMode ? (
            <MoonIcon className="w-2.5 h-2.5 text-accent" />
          ) : (
            <SunIcon className="w-2.5 h-2.5 text-muted" />
          )}
        </div>
      </div>
    </div>
  )
}