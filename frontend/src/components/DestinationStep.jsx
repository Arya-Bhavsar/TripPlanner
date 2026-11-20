import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

export default function DestinationStep() {
  const [destinationInput, setDestinationInput] = useState('');

  const handleSearch = () => {
    console.log("Destination input:", destinationInput);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && destinationInput.trim() !== "") {
      handleSearch();
    }
  };

  const isEmpty = destinationInput.trim() === "";

  return (
    <div className="flex h-full min-h-0 flex-col items-center p-4 mt-2 overflow-hidden">
      {/* Destination Input */}
      <div className="relative w-full max-w-3xl">
        <input
          type="text"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your ideal destination, and we'll find the perfect match for you."
          className="w-full py-4 pl-4 pr-13 bg-surface rounded-full border border-line focus:outline-none focus:border-none focus:ring-2 focus:ring-accent"
        />
        <button
          disabled={isEmpty}
          onClick={handleSearch}
          className={`absolute right-5 top-1/2 -translate-y-1/2 ${isEmpty ? "text-muted" : "text-accent"} font-extrabold text-xl hover:cursor-pointer transition-all duration-300`}
        >
          <Search />
        </button>
      </div>

      {/* Scrollable Destination Cards */}
      <div className="grid grid-cols-3 gap-8 mt-8 w-full min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-1">
        {/* Destination 1 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 1</div>
          <div className="text-sm text-muted">Description of Destination 1</div>
        </div>

        {/* Destination 2 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 2</div>
          <div className="text-sm text-muted">Description of Destination 2</div>
        </div>

        {/* Destination 3 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 3</div>
          <div className="text-sm text-muted">Description of Destination 3</div>
        </div>

        {/* Destination 4 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 4</div>
          <div className="text-sm text-muted">Description of Destination 4</div>
        </div>

        {/* Destination 5 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 5</div>
          <div className="text-sm text-muted">Description of Destination 5</div>
        </div>

        {/* Destination 6 */}
        <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300">
          {/* Image placeholder */}
          <div className="h-60 w-full rounded-xl bg-line"></div>
          <div className="text-lg font-medium text-ink">Destination 6</div>
          <div className="text-sm text-muted">Description of Destination 6</div>
        </div>
      </div>
    </div>
  );
}