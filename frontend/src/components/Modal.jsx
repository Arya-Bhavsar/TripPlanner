import { useEffect, useRef } from "react";
import { X } from "react-bootstrap-icons";

export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Close when clicking on the area outside the modal
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="m-auto w-full max-w-3xl max-h-[85vh] rounded-2xl border border-line bg-surface p-10 text-ink transition-all duration-300 backdrop:bg-black/50 backdrop:backdrop-blur-xs open:flex open:flex-col focus:outline-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line shrink-0">
        <div className="font-display text-2xl font-medium">
          {title}
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-ink cursor-pointer text-2xl transition-colors"
        >
          <X />
        </button>
      </div>

      {/* Body */}
      <div className="mt-4 overflow-y-auto min-h-0">
        {children}
      </div>
    </dialog>
  );
}