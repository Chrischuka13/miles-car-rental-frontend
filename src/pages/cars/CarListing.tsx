import Cars from "@/features/Cars";

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
                <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-semibold tracking-wide">
                  Find your{" "}
                  <span className="text-DeepOrange">perfect ride.</span>
                </h1>
                <p className="text-white text-xl mt-5 tracking-wide">
                  From economy sedans to head-turning luxury SUVs and heavy-duty{" "}
                  <br className="hidden md:block" />
                  trucks — every vehicle inspected, insured and ready.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Cars/>
      </main>
    </>
  );
}
