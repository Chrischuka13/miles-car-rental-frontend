import aboutImage from "/about.jpg";

function About() {
  return (
    <main className="text-base-content bg-[#F9F9F9]">
      <section
        className="relative min-h-[85vh] md:min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.20)), url(${aboutImage})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

     
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto ">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mt-5">
            About <span className="text-orange-500">Miles</span> Car Rental
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-gray-200 leading-relaxed">
            At <span className="text-orange-400 font-medium">Miles</span> car
            rental, we believe getting from A to B should be the easiest part of
            your journey — refined, reliable, and built around you.
          </p>

          <div className=" mt-10 flex flex-col md:flex-row gap-8 w-full justify-center items-center ">
            <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg cursor-pointer">
              Explore cars
              <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-sm">
                →
              </span>
            </button>

            <button className="w-full md:w-auto bg-white hover:bg-gray-100 transition-all duration-300 text-gray-900 px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg cursor-pointer">
              <span className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-sm">
                ▶
              </span>
              Watch our story
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f7f7f7] py-10 ">
        <div className="w-11/12 container p-4  mx-auto  items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img
                src="/image 34.svg"
                alt="People around a car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-sm h-full flex flex-col">
              <div className="text-5xl text-orange-400 mb-10 mt-10">
                <img src="Vector.svg" className="mb-4" alt="quote-Img" />
              </div>

              <p className="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed mb-8">
                "Mobility should never be the hard part. We exist to make sure
                it isn’t."
              </p>

              <div className="border-t pt-4 flex items-center gap-1 md:gap-3">
                <img
                  src="/miles circle.png"
                  className="w-13 h-13"
                  alt="miles-logo"
                />

                <p className="text-gray-700 font-bold text-lg whitespace-nowrap">
                  The{" "}
                  <span className="text-orange-500 font-semibold">Miles</span>{" "}
                  car rental team
                </p>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <p className="text-gray-500 mb-3 flex items-center gap-2 font-bold text-xl">
              <span className="text-orange-500 font-bold text-2xl">•</span>
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Built <span className="text-orange-500">by drivers,</span>
              <br />
              engineered <span className="text-orange-500">for everyone.</span>
            </h2>

            <p className="mt-6 text-gray-600 text-2xl leading-8">
              <span className="text-orange-500 font-medium">Miles</span> car
              rental was born from a simple observation: renting a vehicle in
              Nigeria shouldn’t feel like a negotiation. It should feel like a
              tap, a confirmation, and a key in your hand.
            </p>

            <p className="mt-6 text-gray-600 text-2xl leading-8">
              We're a team of car enthusiasts and tech builders obsessed with
              one thing — making mobility effortless. From the everyday commuter
              to the family planning a weekend escape, we make sure the road is
              open and the ride is yours.
            </p>
          </div>
          <section className="w-full bg-[#f7f7f7] py-10 ">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-2xl p-6 md:p-10">
                <div className="flex flex-col gap-3 mb-6">
                  <div>
                <img src="/Frame 114 (2).png" className="w-10 h-10 mb-3" alt="" />
                  </div>
                  <p className="text-gray-700 font-medium">Our Mission</p>
                </div>

                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug">
                  To make vehicle access simple, fast, and stress-free for every
                  Nigerian on the move.
                </h2>
              </div>

              <div className="bg-[#111827] rounded-2xl p-6 md:p-10">
                <div className="flex flex-col gap-3 mb-6">
                  <div>
                <img src="/Frame 114 (3).png" className="w-10 h-10 mb-3" alt="" />
                  </div>
                  <p className="text-orange-400 font-medium">Our Vision</p>
                </div>

                <h2 className="text-2xl md:text-4xl font-semibold text-white leading-snug">
                  To redefine mobility across cities through seamless,
                  intelligent and reliable digital experiences.
                </h2>
              </div>
            </div>
          </section>{" "}
        </div>
      </section>

        <section className="w-full bg-white py-5">
        <div className="w-11/12 container p-4  mx-auto  grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-orange-500 text-3xl">•</span> Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              We’re  BIG on <span className="text-orange-500">What <br/> Matters</span>{" "}
              to  You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="w-fit mb-3">
                  <img src="/Frame 114.png" className="w-10 h-10" alt=""/>
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Easy Booking Process
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Book your vehicle in under 2 minutes with our simple flow
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-3">
                  <img src="/Frame 115.png" className="w-10 h-10" alt=""/>
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Transparent Pricing
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  What you see is what you pay. No hidden fees, ever.
                </p>
              </div>

              <div className="col-span-1 sm:col-span-2 border-t my-2"></div>

              <div className="flex flex-col">
                <div className="mb-3">
                  <img src="/public/Frame 116.png" className="w-10 h-10" alt=""/>
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Wide Range of Cars
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Book your vehicle in under 2 minutes with our simple flow
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-3">
                  <img src="/public/Frame 114 (1).png" className="w-10 h-10" alt=""/>
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Verified and Reliable
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Every vehicle inspected and every partner background-checked.
                </p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/Frame 96.png"
              className="w-full h-[280px] sm:h-[320px] md:h-[550px] object-cover rounded-2xl shadow-md"
            alt=""/>
          </div>
        </div>
      </section>

       <section className="w-full bg-gray-50">
        <div className="w-11/12 container p-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-3xl p-8 md:p-12 ">
            <div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                {" "}
                <span className="text-orange-500 text-2xl">•</span> Concierge
                Service{" "}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {" "}
                Discover a New Level of{" "}
                <span className="text-orange-500">Comfort</span>{" "}
              </h2>{" "}
              <p className="text-gray-500 mb-6">
                {" "}
                Enjoy a seamless rental experience tailored to your needs. Our
                concierge service is designed to provide comfort, convenience,
                and dedicated support.{" "}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {" "}
                <div>
                  {" "}
                  <h4 className="font-semibold">Easy Booking</h4>{" "}
                  <p className="text-sm text-gray-500">
                    Reserve your ride in 2 minutes.
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-semibold">Professional Drivers</h4>{" "}
                  <p className="text-sm text-gray-500">
                    Vetted, reliable, always on time.
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-semibold">Big fleet of cars</h4>{" "}
                  <p className="text-sm text-gray-500">
                    From everyday rides to luxury trucks.
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-semibold">Seamless Experience</h4>{" "}
                  <p className="text-sm text-gray-500">
                    Fast, smooth, and stress-free.
                  </p>{" "}
                </div>{" "}
              </div>
            </div>

            <img
              src="/image 26.png"
              className="w-full h-[320px] md:h-[500px] object-cover rounded-2xl"
            alt=""/>
          </div>
        </div>
        </section>


 <section className="w-full bg-white py-3">
  <div className="w-11/12 container mx-auto px-4 ">
    <div className="grid w-full grid-cols-2 md:grid-cols-4 border-y border-gray-100 py-4 lg:gap-66 text-center items-center justify-items-center">
      
      <div className="flex flex-col items-center ">
        <h3 className="text-3xl md:text-4xl font-bold text-slate-700">
          500+
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Verified Cars Available
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold text-slate-700">
          34k+
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Happy Customers
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold text-slate-700">
          50+
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Trusted Partners
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold text-slate-700">
          98%
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Satisfaction Rate
        </p>
      </div>

    </div>
  </div>
</section>
   <section className="py-16">
      <div className="w-11/12 container p-4 mx-auto">
  <div className="rounded-3xl bg-orange-500 text-white p-8 md:p-12 flex flex-col md:flex-row items-center">
    <div className="w-full flex flex-col items-center">
      <h3 className="text-2xl whitespace-nowrap">
        Ready to move smarter?
      </h3>
      <p className="text-center text-gray-50 leading-6 mt-2">
        Book your next ride in minutes and experience a better way to travel. Your road, your rules.
      </p>
      <div className="w-full md:w-auto mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
 <div>
        <button className="btn bg-black py-2 px-5 mt-5 rounded-2xl">
        Get Started
      </button>
      </div>
      <div>
        <button className="btn bg-white text-black py-2 px-5 mt-5 rounded-2xl">
        Talk to our team
      </button>
      </div>
      </div>
    </div>
    </div>
    </div>
    </section>
    </main>
  );
}

export default About;
