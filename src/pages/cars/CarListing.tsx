import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  EqualNot,
  Fuel,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";


export default function CarListing() {
  return (
    <>
    
      <main className="bg-white">
        <div className="">
          {/* car listing bg section */}
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
            <div className="w-11/12 container p-4 mx-auto flex items-center justify-items-start h-full">
              <div className=" py-6">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide">
                  Find your{" "}
                  <span className="text-[#F97316]">perfect ride.</span>
                </h1>
                <p className="text-white mt-5 tracking-wide">
                  From economy sedans to head-turning luxury SUVs and heavy-duty{" "}
                  <br className="hidden md:block" />
                  trucks — every vehicle inspected, insured and ready.
                </p>
              </div>
            </div>
          </div>

          {/* car listing page content section */}
          <section className="w-11/12 container p-4 mx-auto relative">
            {/* search section container - changed absolute to relative on mobile for better flow */}
            <div className="relative lg:absolute w-full -top-15 lg:-top-10 py-4 px-6 rounded-2xl bg-[#FFFFFF]">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10 py-2">
                {/* first box */}
                <div className="w-full lg:w-auto">
                  <div className="relative w-full">
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
                      className="block w-full lg:w-80 py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-[#F4F0EC] focus:ring-gray-200 focus:border-gray-400 outline-none"
                      placeholder="Search by name or brand..."
                      required
                    />
                  </div>
                </div>
                {/* second box */}
                <div className="w-full lg:flex-1">
                  {/* Added overflow-x-auto so tags don't break on small screens */}
                  <div className="flex items-center justify-start lg:justify-between gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    <span className="py-3 px-6 text-white bg-[#F97316] rounded-2xl cursor-pointer whitespace-nowrap">
                      All
                    </span>
                    <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer whitespace-nowrap">
                      Sedan
                    </span>
                    <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer whitespace-nowrap">
                      SUV
                    </span>
                    <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer whitespace-nowrap">
                      Luxury
                    </span>
                    <span className="py-3 px-6 bg-[#F4F0EC] rounded-2xl cursor-pointer whitespace-nowrap">
                      Truck
                    </span>
                    <div className="flex items-center justify-between bg-[#F4F0EC] py-3 px-6 min-w-[140px] rounded-2xl cursor-pointer">
                      <span>Featured</span>
                      <span>
                        <ArrowDown className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* content section for car listing section */}
          <section className="w-11/12 container p-4 mx-auto lg:py-20 pb-5">
            <div className="flex items-center justify-between lg:mt-0">
              <p className="flex items-center gap-2">
                <span className="font-semibold">6</span>
                <span className="text-[#A1A1A1]">Vehicle Available</span>
              </p>
              <div className="flex gap-3 font-semibold cursor-pointer">
                <span>
                  <SlidersHorizontal />
                </span>
                <p className="hidden sm:block">More filters</p>
              </div>
            </div>

            {/*available cars section */}
            <section className="mt-10">
              {/* Added gap and adjusted grid cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* each grid boxes for each car */}
                {/* one */}
                <div className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden">
                  {/* box for the image */}
                  <div className="relative w-full h-48">
                    <img
                      src="/LexusEs.png"
                      alt="Lexus ES"
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                      Executive
                    </p>
                  </div>
                  {/* box for vehicle description */}
                  <div className="bg-[#FFFFFF] w-full px-5 py-4">
                    <span className="flex items-center justify-between">
                      <p className="text-[#A1A1A1] text-xs uppercase">Luxury</p>
                      <p className="text-lg font-bold">$59</p>
                    </span>
                    <span className="flex items-center justify-between">
                      <h2 className="font-bold text-xl">Lexus ES</h2>{" "}
                      <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                    </span>
                    <hr className="mt-4 text-[#E6E0E0]" />
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                      {/* features */}
                      <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                        <span className="flex items-center gap-1">
                          <UsersRound className="w-4" />
                          <p className="text-sm">5</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-4" />
                          <p className="text-sm">Hybrid</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <EqualNot className="w-4" />
                          <p className="text-sm">Auto</p>
                        </span>
                      </div>
                      {/* button */}
                      <Link  to="/cars/cardetails" className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] rounded-full text-center font-medium">
                        Book
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden">
                  {/* box for the image */}
                  <div className="relative w-full h-48">
                    <img
                      src="/LexusEs.png"
                      alt="Lexus ES"
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                      Executive
                    </p>
                  </div>
                  {/* box for vehicle description */}
                  <div className="bg-[#FFFFFF] w-full px-5 py-4">
                    <span className="flex items-center justify-between">
                      <p className="text-[#A1A1A1] text-xs uppercase">Luxury</p>
                      <p className="text-lg font-bold">$59</p>
                    </span>
                    <span className="flex items-center justify-between">
                      <h2 className="font-bold text-xl">Lexus ES</h2>{" "}
                      <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                    </span>
                    <hr className="mt-4 text-[#E6E0E0]" />
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                      {/* features */}
                      <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                        <span className="flex items-center gap-1">
                          <UsersRound className="w-4" />
                          <p className="text-sm">5</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-4" />
                          <p className="text-sm">Hybrid</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <EqualNot className="w-4" />
                          <p className="text-sm">Auto</p>
                        </span>
                      </div>
                      {/* button */}
                      <button className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] rounded-full text-center font-medium">
                        Book
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden">
                  {/* box for the image */}
                  <div className="relative w-full h-48">
                    <img
                      src="/LexusEs.png"
                      alt="Lexus ES"
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                      Executive
                    </p>
                  </div>
                  {/* box for vehicle description */}
                  <div className="bg-[#FFFFFF] w-full px-5 py-4">
                    <span className="flex items-center justify-between">
                      <p className="text-[#A1A1A1] text-xs uppercase">Luxury</p>
                      <p className="text-lg font-bold">$59</p>
                    </span>
                    <span className="flex items-center justify-between">
                      <h2 className="font-bold text-xl">Lexus ES</h2>{" "}
                      <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                    </span>
                    <hr className="mt-4 text-[#E6E0E0]" />
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                      {/* features */}
                      <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                        <span className="flex items-center gap-1">
                          <UsersRound className="w-4" />
                          <p className="text-sm">5</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-4" />
                          <p className="text-sm">Hybrid</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <EqualNot className="w-4" />
                          <p className="text-sm">Auto</p>
                        </span>
                      </div>
                      {/* button */}
                      <button className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] rounded-full text-center font-medium">
                        Book
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center border border-[#E6E0E0] rounded-2xl overflow-hidden">
                  {/* box for the image */}
                  <div className="relative w-full h-48">
                    <img
                      src="/LexusEs.png"
                      alt="Lexus ES"
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute top-2 left-3 bg-[#FFFFFF] px-3 py-1 text-[10px] font-bold rounded-full uppercase shadow-sm">
                      Executive
                    </p>
                  </div>
                  {/* box for vehicle description */}
                  <div className="bg-[#FFFFFF] w-full px-5 py-4">
                    <span className="flex items-center justify-between">
                      <p className="text-[#A1A1A1] text-xs uppercase">Luxury</p>
                      <p className="text-lg font-bold">$59</p>
                    </span>
                    <span className="flex items-center justify-between">
                      <h2 className="font-bold text-xl">Lexus ES</h2>{" "}
                      <p className="text-[#A1A1A1] text-xs uppercase">/Day</p>
                    </span>
                    <hr className="mt-4 text-[#E6E0E0]" />
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mt-4">
                      {/* features */}
                      <div className="flex items-center justify-between w-full xl:w-auto gap-3 text-[#727477]">
                        <span className="flex items-center gap-1">
                          <UsersRound className="w-4" />
                          <p className="text-sm">5</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-4" />
                          <p className="text-sm">Hybrid</p>
                        </span>
                        <span className="flex items-center gap-1">
                          <EqualNot className="w-4" />
                          <p className="text-sm">Auto</p>
                        </span>
                      </div>
                      {/* button */}
                      <button className="w-full xl:w-auto cursor-pointer px-4 py-2 text-white bg-[#F97316] rounded-full text-center font-medium">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* pagination  */}
            <section className="flex items-center justify-between mt-5 py-5 lg:py-2">
              <div
                className="hidden
              md:flex items-center gap-2 text-[#878789]"
              >
                <span>10</span>Entries per page
              </div>
              <div className="flex items-center gap-2 text-[#878789]">
                Page 1 of 1
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center gap-2 text-[#878789] border border-[#878789] py-1 px-1 md:px-5 md:py-2 cursor-pointer">
                  <span>
                    <ArrowLeft />
                  </span>
                  <span>Previous</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-[#878789] border border-[#878789] py-1 px-1 md:px-5 md:py-2 cursor-pointer">
                  <span>Next</span>
                  <span>
                    <ArrowRight />
                  </span>
                </button>
              </div>
            </section>
          </section>
        </div>
      </main>
    
    </>
  );
}
