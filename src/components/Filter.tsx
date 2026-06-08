import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

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

  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [active, setActive] = useState(
    () => searchParams.get("category") || "ALL",
  );

  const categories = ["ALL", "SEDAN", "SUV", "LUXURY", "TRUCK"];

  // Debounce the input state by 400ms
  const [debouncedSearch] = useDebounce(search, 400);

  // fires when typing stops for 400ms, updates the URL and parent state
  useEffect(() => {
    setSearchTerm(debouncedSearch);

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, searchParams, setSearchParams, setSearchTerm]);

  const applyCategory = (cat: string) => {
    setActive(cat);
    setActiveCategory(cat);

    const params = new URLSearchParams(searchParams);
    if (cat !== "ALL") {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    setSearchParams(params, { replace: true });

    setOpen(false);
  };

  const clearAll = () => {
    setSearch("");
    setActive("ALL");
    setSearchTerm("");
    setActiveCategory("ALL");

    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("category");
    setSearchParams(params, { replace: true });

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
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2"
      >
        <img src="/Tuning.svg" className="w-5" alt="Filter Icon" />
        <span className="font-semibold">More Filters</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40" onClick={()=> setOpen(false)}/>

          <div className="absolute right-0 mt-3 w-85 z-40 animate-[fadeSlide_0.25s_ease-out]">
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter Cars</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, brand, fuel..."
                className="w-full p-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

              <div className="grid grid-cols-2 gap-2 mt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => applyCategory(cat)}
                    className={`py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      active === cat
                        ? "bg-DeepOrange text-white shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-5">
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Reset
                </button>

                <button
                  type="button"
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

      <style>
        {`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        `}
      </style>
    </div>
  );
}