import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

export default function DestinationStep() {
  const [destinationInput, setDestinationInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && destinationInput.trim() !== "") {
      // Code here
    }
  };

  const isEmpty = destinationInput.trim() === "";

  return (
    <div className="flex p-4 mt-2 items-center justify-center">
      {/* Destination Input */}
      <div className="relative w-full max-w-3xl">
        <input
          type="text"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your ideal destination, and we'll find the perfect match for you."
          className="w-full p-4 bg-surface rounded-full border border-line focus:outline-none focus:border-none focus:ring-2 focus:ring-accent"
        />
        <button
          disabled={isEmpty}
          className={`absolute right-5 top-1/2 -translate-y-1/2 ${isEmpty ? "text-muted" : "text-accent"} font-extrabold text-xl hover:cursor-pointer transition-all duration-300`}
        >
          <Search />
        </button>
      </div>
    </div >
  );
}