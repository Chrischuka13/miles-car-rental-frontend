import WhyChooseUs from "@/components/whyChooseUs";
import aboutImage from "/about.jpg";
import OurService from "@/components/OurService";
import Testimonial from "@/components/Testimonial";

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
                
              </span>
              Watch our story
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f7f7f7] py-10 ">
        <div className="w-11/12 container mx-auto items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img
                src="/image 34.svg"
                alt="People around a car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-sm h-full flex flex-col">
              <div className="text-4xl text-orange-400 mb-10 mt-10">
                <img src="Vector.svg" className="mb-4" alt="quote-Img" />
              </div>

              <p className="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed mb-8">
                "Mobility should never be the hard part. We exist to make sure
                it isn’t."
              </p>

              <div className="border-t pt-3 flex items-center gap-1 md:gap-3">
                <img
                  src="/miles circle.png"
                  className="w-12 h-12"
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

          <section className="w-full bg-[#f7f7f7] py-16 ">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
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

              <div className="bg-DarkBlue rounded-2xl p-6 md:p-10">
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

      <WhyChooseUs/>

      <OurService/>
        
      <Testimonial/>

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
