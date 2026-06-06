import WhyChooseUs from "@/components/whyChooseUs";
import aboutImage from "/about.jpg";
import OurService from "@/components/OurService";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Buttons2 from "@/components/ui/Buttons2";
import Buttons from "@/components/ui/Buttons";
import useMetaTags from "@/hooks/useMeta";


function About() {
  useMetaTags({
    title: "About Us - Miles Car Rental",
    description:
      "Learn more about Miles Car Rental and our mission to make car rentals simple, fast, and affordable.",
    keywords:
      "Miles Car Rental, about us, car rental service, vehicle hire",
  });
  const { user } = useAuth();
  return (
    <main className="">
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
            <Link to="/cars/carListing">
              <Buttons2 text="Explore cars" />
            </Link>
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
            <div className="bg-white rounded-3xl p-4 shadow-sm h-full flex flex-col">
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
              <div className="bg-white rounded-2xl p-4 md:p-10">
                <div className="flex flex-col gap-3 mb-6">
                  <div>
                    <img
                      src="/Frame 114 (2).png"
                      className="w-10 h-10 mb-3"
                      alt=""
                    />
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
                    <img
                      src="/Frame 114 (3).png"
                      className="w-10 h-10 mb-3"
                      alt=""
                    />
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

      <WhyChooseUs />

      <OurService />

      <section className="py-12">
        <div className="w-11/12 container mx-auto">
          <div className="bg-DeepOrange flex flex-col justify-center items-center p-4 md:p-10 rounded-lg text-center md:text-start">
            <h3 className="text-2xl md:text-5xl text-white mb-2 font-semibold">
              Ready to move smarter?
            </h3>
            <p className="text-white md:text-xl mb-8">
              Book your next ride in minutes and experience a better way to
              travel. Your road, your rules
            </p>

            {user ? (
              <div className="flex justify-center items-center gap-3">
                <div>
                  <Link to="/cars/carListing">
                    <Buttons text="Book Now" />
                  </Link>
                </div>
                <Link to="/contactus">
                  <button className="bg-white p-3 rounded-4xl font-medium">
                    Talk to our team
                  </button>              
                </Link>

              </div>

            ) : (
              <div className="md:flex justify-center items-center gap-4">
                <div className="flex justify-center gap-4">
                  <Link to="/auth/register">
                    <Buttons text="Get Started" />
                  </Link>

                  <button className="bg-white rounded-full p-2 cursor-pointer px-4 font-semibold text-gray-800 hover:bg-gray-100">
                    <Link to="/cars/carListing">Talk to our team</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
