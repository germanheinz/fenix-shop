"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { findProductsBySlug } from "@/actions";

export default function ExpandableSearch({ onSearchResults }: { onSearchResults?: (results: any[]) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <motion.div
      animate={{ width: open ? 200 : 36 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-center border-gray-300 rounded-full overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-gray-800"
      >

        <IoSearchOutline onClick={() => setOpen(!open)} className="w-5 h-5" />
      </button>

      {open && (
        <input
          type="text"
          autoFocus
          value={query}
          placeholder="Type something..."
          className="flex-1 bg-transparent px-2 text-sm outline-none"
          onChange={async (e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.length > 1) {
              const res = await findProductsBySlug(value);
              if (onSearchResults) onSearchResults(res || []);
            } else {
              if (onSearchResults) onSearchResults([]);
            }
          }}
        />
      )}
    </motion.div>
  );
}
