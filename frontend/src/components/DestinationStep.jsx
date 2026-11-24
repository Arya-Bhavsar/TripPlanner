import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import api from '../axios';

export default function DestinationStep() {
  const [destinationInput, setDestinationInput] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    console.log("Destination input:", destinationInput);

    const query = destinationInput.trim();
    if (!query || loading) return;

    setLoading(true);
    setError(null);

    try {
      // Make an API call to fetch destinations based on the input
      const { data } = await api.post('/destinations', { prompt: query });
      const destList = data.destinations;
      setDestinations(destList);

      const names = destList.map(dest => dest.name).filter(Boolean);
      if (names.length) {
        const res = await api.post('/destinations/images', { destinations: names });
        setImages(res.data.results);
        console.log("Fetched images:", res.data.results);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching destinations. Please try again.');
    } finally {
      setLoading(false);
    }
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
          className="w-full py-4 pl-4 pr-13 bg-surface rounded-full border border-line focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          disabled={isEmpty}
          onClick={handleSearch}
          className={`absolute right-5 top-1/2 -translate-y-1/2 ${isEmpty ? "text-muted" : "text-accent"} font-extrabold text-xl hover:cursor-pointer transition-all duration-300`}
        >
          <Search />
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && (
        <div className="flex items-center justify-center gap-3 mt-8 text-muted">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-line border-t-accent" />
          <span>Finding destinations...</span>
        </div>
      )}
      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}

      {/* Scrollable Destination Cards */}
      <div className="grid grid-cols-3 gap-8 mt-8 w-full min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-1">
        {destinations.map((dest, index) => {
          const imageUrl = images[dest.name]?.[0] || '';

          return (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-line hover:ring-2 hover:ring-accent transition-all duration-300"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={dest.name}
                  className="h-60 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="h-60 w-full rounded-xl bg-line" />
              )}
              <div className="text-lg font-medium text-ink">{dest.name}</div>
              <div className="text-sm text-muted">{dest.tagline}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}