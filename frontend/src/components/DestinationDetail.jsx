import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "react-bootstrap-icons"

export default function DestinationDetail({
  destination,
  images = [],
  isSelected,
  onSelect
}) {
  const [index, setIndex] = useState(0);

  if (!destination) return null;

  const imageList = Array.isArray(images) ? images : [];
  const count = imageList.length;
  const current = index < count ? index : 0;

  // Helper function to move the carousel forward or backward
  const go = (delta) => setIndex((current + delta + count) % count)

  return (
    <div className="flex flex-col gap-5">
      {/* Carousel */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-line bg-page">
        {count > 0 ? (
          <img
            src={imageList[current]}
            alt={`${destination.name} ${current + 1}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No images
          </div>
        )}

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-surface/90 p-2 text-ink hover:border-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-surface/90 p-2 text-ink hover:border-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-line bg-surface/85 px-2.5 py-1">
              {imageList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ease-out ${i === current ? "w-4 bg-accent" : "w-2 bg-muted/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Summary */}
      <div className="space-y-1">
        {destination.tagline && (
          <p className="text-sm font-medium text-accent">{destination.tagline}</p>
        )}
        <p className="text-sm leading-relaxed text-muted">
          {destination.summary}
        </p>
      </div>

      {/* Tags */}
      {destination.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-page px-3 py-1 text-xs font-medium text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Select Button */}
      <div className="flex justify-end border-t border-line pt-4">
        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${isSelected
            ? "border border-accent bg-accent/15 text-accent"
            : "bg-accent text-white hover:opacity-90"
            }`}
        >
          {isSelected && <Check className="h-4 w-4" />}
          {isSelected ? "Selected" : "Select Destination"}
        </button>
      </div>
    </div>
  );
}