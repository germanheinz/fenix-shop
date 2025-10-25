// SearchModal.tsx
import React from "react";

interface ProductResult {
  id: string;
  image: string | null;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  results: ProductResult[];
}

export default function SearchModal({ open, onClose, results }: SearchModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="grid grid-cols-2 gap-4">
          {results.length === 0 ? (
            <p className="col-span-2 text-center">No se encontraron productos.</p>
          ) : (
            results.map(({ id, image }) => (
              <div key={id} className="flex flex-col items-center">
                {image && (
                  <img
                    src={image}
                    alt="Producto"
                    className="w-24 h-24 object-cover rounded mb-2"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}