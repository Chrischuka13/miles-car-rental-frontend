import heroImage from "/heroImage.jpg"; // Adjust path based on your project structure
// import TrendingCars from "@/sections/TrendingCars";
import WhyChooseUs from "@/components/whyChooseUs";
import OurService from "@/components/OurService";
import Banner from "@/components/ui/Banner";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import TrendingCars from "@/features/TrendingCars";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Buttons2 from "@/components/ui/Buttons2";
import useMetaTags from "@/hooks/useMeta";


export default function Home() {
  useMetaTags({
    title: "Miles Car Rental",
    description:
      "Manage drivers, track trips, and monitor availability.",
    keywords:
      "drivers, fleet management, logistics, transportation",
  });
  const {user} = useAuth()

  return (
    <main className="text-base-content bg-[#F9F9F9] overflow-hidden">
      {/* HERO */}
      <section
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.80), rgba(0,0,0,0.40)), url(${heroImage})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
          <div className="text-center text-white max-w-5xl mx-auto mt-2 md:mt-30 gap-10">
            <div className=" bg-overlay/60 border-white/30 text-orange-500 px-5 py-1 rounded-full mb-6 mt-15 lg:mt-5 inline-flex items-center justify-center max-w-fit text-center backdrop-blur-md">
              Join over 34k happy customers
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Move Smarter.{" "}
              <span className="text-orange-500">Ride Better.</span>
            </h1>

            <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Rent cars, trucks, buses, and luxury cars instantly. With or
              without a driver, we’ve got the perfect ride for your next
              adventure.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex justify-center gap-4">
                {user ? <Link to="/cars/carListing"><Buttons2 text="Book Now"/></Link> : <Link to="/auth/register"><Buttons2 text="Book Now"/></Link> }
                <button className="bg-white rounded-full p-2 cursor-pointer px-4 font-semibold text-gray-800 hover:bg-gray-100">
                  <Link to="/cars/carListing">Explore Cars</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className="w-11/12 container p-4  mx-auto  items-center">
          <div className="flex items-center  font-semibold ">
            <p className="text-orange-500 mb-3 text-3xl">•</p>
            <p className="text-black-500 mb-2">
              Redefining the Rental Experience
            </p>
          </div>

          <p className="text-2xl md:text-3xl font-semibold leading-tight text-slate-600">
            At <span className="text-orange-500">Miles</span> car rental, we
            believe getting from A to B should be the easiest part of your
            journey. We are a team of car enthusiasts and tech innovators,
            re-imagining the way Nigerians discover, book, and experience
            vehicles. From discovery to delivery, we've made it smooth, fast and
            worry-free.
          </p>
        </div>
      </section>

      <WhyChooseUs />

      <TrendingCars />

      {/* TRENDING */}

      <Banner />

      <section className="py-16">
        <div className="w-11/12 container mx-auto">
          <div className="rounded-3xl relative text-white p-4 md:p-12 flex flex-col md:flex-row items-center overflow-hidden">
            <div className="absolute inset-0 bg-orange-500 z-0"></div>
            <div
              className="absolute inset-0 z-10 "
              style={{
                backgroundImage: "url('/pattern.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="relative z-10 w-full md:w-1/2">
              <p className="text-sm flex items-center gap-2">
                <span className="text-2xl">•</span>
                Best Deal No Limit
              </p>

              <h3 className="text-4xl md:text-6xl font-bold underline mb-10">
                50%
              </h3>

              <p className="text-2xl md:text-4xl mt-4">
                Book Cyber Truck <br /> with a big discount!
              </p>

              <Link to="/auth/register">
                <button className="flex relative bg-DarkBlue items-center justify-center gap-2 p-1 px-5 rounded-[25px] overflow-hidden font-medium hover:text-white group hover:bg-gray-50 mt-4">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-DarkBlue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <div className="relative flex justify-center items-center text-white">Get started<img src="/arrow.png" alt="" className="inset-0  object-cover transition-opacity duration-300 group-hover:opacity-0"/></div>
                </button>
              </Link>
            </div>

            {/* image side */}
            <div className="relative z-10 w-full md:w-1/2">
              <img
                src="/unsplash__JkqGe0ufU8.png"
                className="h-50 md:h-full w-full object-cover"
                alt="Cyber Truck"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full bg-gray-50">
        <OurService />
        <Testimonial />
      </section>

      {/* Stats */}
      <section className="w-full bg-white py-12">
        <div className="w-11/12 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between">
            <div className="flex flex-col justify-center items-center mb-6">
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-700">
                500+
              </h3>
              <p className="text-[#A1A1A1] md:text-2xl mt-2 font-light">
                Verified Cars Available
              </p>
            </div>

            <div className="flex flex-col justify-center items-center mb-6">
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-700">
                34k+
              </h3>
              <p className="text-[#A1A1A1] md:text-2xl mt-2 font-light">
                Happy Customers
              </p>
            </div>

            <div className="flex flex-col justify-center items-center mb-6">
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-700">
                50+
              </h3>
              <p className="text-[#A1A1A1] md:text-2xl mt-2 font-light">
                Trusted Partners
              </p>
            </div>

            <div className="flex flex-col justify-center items-center mb-6">
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-700">
                98%
              </h3>
              <p className="text-[#A1A1A1] md:text-2xl mt-2 font-light">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}
