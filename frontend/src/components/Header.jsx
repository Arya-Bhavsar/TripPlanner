import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-gray-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
      <div className="text-2xl font-bold text-blue-500 whitespace-nowrap">Trip Planner</div>
      <ThemeToggle />
    </header>
  )
}