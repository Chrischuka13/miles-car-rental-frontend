import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

export default function Filter({
  setSearchTerm,
  setActiveCategory,
}: {
  setSearchTerm: (value: string) => void;
  setActiveCategory: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState("ALL");

  const categories = ["ALL", "SEDAN", "SUV", "LUXURY", "TRUCK"];

  const applyCategory = (cat: string) => {
    setActive(cat);
    setActiveCategory(cat);

    const params = new URLSearchParams(searchParams);
    params.set("category", cat);
    setSearchParams(params);

    setOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    setSearchParams(params);
  };

  const clearAll = () => {
    setSearch("");
    setActive("ALL");

    setSearchTerm("");
    setActiveCategory("ALL");

    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("category");
    setSearchParams(params);

    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  

  return (
    <div ref={ref} className="relative">
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2"
      >
        <img src="/Tuning.svg" className="w-5"/>
        <span className="font-semibold">More Filters</span>
      </button>

      {/* OVERLAY */}
      {open && (
        <>
          {/* background blur */}
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40" />

          {/* PANEL */}
          <div className="absolute right-0 mt-3 w-[340px] z-50 animate-[fadeSlide_0.25s_ease-out]">
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-5">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter Cars</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              {/* SEARCH */}
              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, brand, fuel..."
                className="w-full p-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

              {/* CATEGORY GRID */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => applyCategory(cat)}
                    className={`py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      active === cat
                        ? "bg-[#F97316] text-white shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Reset
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ANIMATION */}
      <style>
        {`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        `}
      </style>
    </div>
  );
}
