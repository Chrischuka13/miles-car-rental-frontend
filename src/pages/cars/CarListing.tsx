import {
  ArrowDown,
  EqualNot,
  Fuel,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

export default function CarListing() {
  return (
    <main className="bg-white">
      <div className="">
        {/* car listing  bg section */}
        <div
          className=""
          style={{
            backgroundImage: "url('/carListingBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <div className="container mx-auto flex items-center justify-items-start h-full px-5">
            <div className=" py-6">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide">
                Find your <span className="text-[#F97316]">perfect ride.</span>
              </h1>
              <p className="text-white mt-5 tracking-wide">
                From economy sedans to head-turning luxury SUVs and heavy-duty{" "}
                <br />
                trucks — every vehicle inspected, insured and ready.
              </p>
            </div>
          </div>
        </div>

        {/* car listing page content section */}
        <section className="container mx-auto relative">
          {/* search section container */}
          <div className="absolute w-full -top-10 py-4 px-6 rounded-2xl bg-[#FFFFFF]">
            <div className="flex items-center justify-between gap-10 py-2">
              {/* first box */}
              <div>
                <div className="relative w-full max-w-xl hidden lg:block">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-lg py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-[#F4F0EC] focus:ring-gray-200 focus:border-gray-400 outline-none"
                    placeholder="Search by name or brand..."
                    required
                  />
                </div>
              </div>
              {/* second box */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="py-3 px-6 text-white bg-[#F97316] rounded-2xl cursor-pointer">
                    All
                  </span>
                  <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer">
                    Sedan
                  </span>
                  <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer">
                    SUV
                  </span>
                  <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer">
                    Luxury
                  </span>
                  <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer">
                    Truck
                  </span>
                  <div className="flex items-center justify-between bg-[#F4F0EC] py-3 px-6 max-w-50 w-full rounded-2xl  cursor-pointer">
                    <span>Featured</span>
                    <span>
                      <ArrowDown />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content section for car listing section */}
        <section className="container mx-auto py-20 px-10">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              <span className="font-semibold">6</span>
              <span className="text-[#A1A1A1]">Vehicle Available</span>
            </p>
            <div className="flex gap-3 font-semibold cursor-pointer">
              <span>
                <SlidersHorizontal />
              </span>
              <p>More filters</p>
            </div>
          </div>

          {/*available cars section */}
          <section className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* each grid boxes for each car */}
              <div className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl">
                {/* box for the image */}
                <div className="relative w-full">
                  <img
                    src="/LexusEs.png"
                    alt=""
                    className="rounded-tr-2xl rounded-tl-2xl w-full h-full object-cover"
                  />
                  <p className="absolute top-2 left-3 bg-[#FFFFFF] px-2 rounded-full uppercase">
                    Executive
                  </p>
                </div>
                {/* box for vehicle description */}
                <div className="bg-[#FFFFFF] w-full px-5 py-4 rounded-bl-2xl rounded-br-2xl">
                  <span className="flex items-center justify-between">
                    <p className="text-[#A1A1A1] text-xs uppercase">Luxury</p>
                    <p className="text-lg font-bold">$59</p>
                  </span>
                  <span className="flex items-center justify-between">
                    <h2 className="font-bold text-2xl">Lexus ES</h2>{" "}
                    <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                  </span>
                  <hr className="mt-5 text-[#E6E0E0]" />
                  <span className="flex items-center w-full gap-2 mt-2">
                    {/* first box */}
                    <div className="flex items-center gap-2 w-full text-[#727477]">
                      <span className="flex items-center gap-1 ">
                        <p>
                          <UsersRound className="w-4" />
                        </p>
                        <p>5</p>
                      </span>
                      <span className="flex items-center gap-1">
                        <p>
                          <Fuel className="w-4" />
                        </p>
                        <p>Hybrid</p>
                      </span>
                      <span className="flex items-center gap-1">
                        <p>
                          <EqualNot className="w-4" />
                        </p>
                        <p>Auto</p>
                      </span>
                    </div>
                    {/* second */}
                    <button className="cursor-pointer px-6 py-2 text-white bg-[#F97316] rounded-full">
                      Book
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}



