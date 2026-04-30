import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router";

export default function CarDetails() {
  const navigate = useNavigate();
  return (
    <>
      <section className="min-h-screen flex flex-col bg-white">
        <div className="container mx-auto mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
          {/* back to fleet navigation */}
          <div className="flex items-center gap-3 sm:gap-5 mt-6 sm:mt-6 lg:mt-10 cursor-pointer">
            <ArrowLeft className="text-[#1C274C] w-5 h-5 sm:w-6 sm:h-6" />
            <span
              onClick={() => navigate(-1)}
              className="text-[#9CA3AF] text-sm sm:text-base cursor-pointer"
            >
              Back to fleet
            </span>
          </div>

          {/* content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mt-8 lg:mt-10 pb-10">
            {/* first box */}
            <div className="w-full lg:w-[55%]">
              <img
                src="/LexusBg.png"
                alt=""
                className="rounded-2xl cursor-pointer object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-full"
              />
            </div>

            {/* second box */}
            <div className="flex flex-col w-full lg:w-[45%]">
              <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  City
                </p>
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  Economy
                </p>
                <p className="border border-[#BBBBBB] px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm">
                  Best Seller
                </p>
              </span>

              <span className="mt-4">
                <p className="text-[#F97316] font-bold text-xs sm:text-sm">
                  SEDAN · 2023
                </p>
                <h1 className="py-1 font-bold text-xl sm:text-2xl lg:text-3xl">
                  LEXUS ES
                </h1>

                {/* star rating */}
                <div className="flex items-center justify-start gap-1">
                  <div className="flex items-center gap-1">
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                    <img src="/Star.png" alt="" className="h-5 w-5" />
                  </div>
                  <p>4.9 · 142 trips</p>
                </div>

                <p className="text-[#505050] py-2 text-sm sm:text-base leading-relaxed">
                  Reliable, fuel-efficient and effortless to drive across Lagos.
                  The Corolla is the workhorse for daily commutes, airport runs
                  and weekend getaways.
                </p>

                <span className="flex items-baseline gap-2 sm:gap-4 max-w-xs w-full text-[#4B5563]">
                  <p className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black">
                    $59
                  </p>
                  <span className="text-sm sm:text-base">
                    /day. all-inclusive
                  </span>
                </span>
              </span>

              <span className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-5 w-full">
                <button className="flex items-center justify-center bg-[#F97316] text-white rounded-full px-4 py-2 gap-2 w-full sm:w-auto cursor-pointer">
                  <p className="text-sm sm:text-base">Book this car</p>
                  <span>
                    <img src="/stasharrow.png" alt="" className="w-4 sm:w-6" />
                  </span>
                </button>

                <button className="border border-[#4B5563] px-4 py-2 rounded-full w-full sm:w-auto text-sm sm:text-base cursor-pointer">
                  <p>Add a driver</p>
                </button>
              </span>
            </div>
          </div>
        </div>
        {/*car builds details section */}
        {/* <section className="bg-[#FCFAF8] h-50">

        </section> */}
      </section>
    </>
  );
}
