// import useMetaArgs from "@/hooks/useMeta";
import TrendingCars from "../../sections/TrendingCars";


export default function Home() {
//   useMetaArgs({
//     title: "Home, Miles Car Rental",
//     description: "Welcome to Miles Car Rental!",
//     keywords: "car rental, rent a car, luxury cars, trucks, buses, Nigeria",
//   });

  return (
    <main className="bg-base-100 text-base-content">

      {/* HERO */}
      <section
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
          <div className="text-center text-white max-w-5xl mx-auto">
            <div className="badge badge-outline border-white/30 text-orange-500 px-5 py-4 rounded-full mb-6 mt-15 lg:mt-5 ">
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
              <button className="btn bg-orange-500 hover:bg-orange-600 border-none rounded-full px-8 text-white">
                Book Now
              </button>
              <button className="btn btn-white rounded-full px-8">
                Explore Cars
              </button>
            </div>
          </div>

          {/* SEARCH CARD */}
          <div className="mt-14 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 p-4 md:p-6 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-white font-semibold flex items-center">
              Need to Rent a Luxury Car?
            </div>

            <input
              className="input input-bordered w-full rounded-xl"
              placeholder="Pickup Location"
            />
            <input
              className="input input-bordered w-full rounded-xl"
              placeholder="Pickup Date"
            />
            <input
              className="input input-bordered w-full rounded-xl"
              placeholder="Return Date"
            />
            <input
              className="input input-bordered w-full rounded-xl"
              placeholder="Car Type"
            />

            <button className="btn bg-orange-500 hover:bg-orange-600 border-none rounded-full text-white">
              Find a Car
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
          <div className="flex gap-2 text-center items-center">
            <p className="text-orange-500 mb-2 text-3xl">•</p>
            <p className="text-black-500 mb-2">
              Redefining the Rental Experience
            </p>
          </div>

          <p className="text-3xl md:text-3xl font-semibold leading-tight text-slate-600">
            At <span className="text-orange-500">Miles</span> car rental, we
            believe getting from A to B should be the easiest part of your
            journey. We are a team of car enthusiasts and tech innovators,
            re-imagining the way Nigerians discover, book, and experience
            vehicles. From discovery to delivery, we've made it smooth, fast and
            worry-free.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="text-orange-500">•</span> Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              We’re BIG on <span className="text-orange-500">What Matters</span>{" "}
              to You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="bg-orange-100 p-4 rounded-full w-fit mb-3">
                  <img src="/icons/booking.svg" className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Easy Booking Process
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Book your vehicle in under 2 minutes with our simple flow
                </p>
              </div>

              <div className="flex flex-col">
                <div className="bg-orange-100 p-4 rounded-full w-fit mb-3">
                  <img src="/icons/pricing.svg" className="w-6 h-6" />
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
                <div className="bg-orange-100 p-4 rounded-full w-fit mb-3">
                  <img src="/icons/car.svg" className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-800 text-2xl">
                  Wide Range of Cars
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Book your vehicle in under 2 minutes with our simple flow
                </p>
              </div>

              <div className="flex flex-col">
                <div className="bg-orange-100 p-4 rounded-full w-fit mb-3">
                  <img src="/icons/verified.svg" className="w-6 h-6" />
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
              src="/images/car.jpg"
              className="w-full h-[280px] sm:h-[320px] md:h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Trending <span className="text-orange-500">cars</span> for The
              Week
            </h3>

            <button className="btn btn-ghost text-orange-500 self-start md:self-auto">
              Explore full fleet
            </button>
          </div>

        </div>
      </section>
        <TrendingCars />

      {/* LOGOS */}
      <section className="w-full bg-gray-100 py-6">
        <div className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex w-max animate-scroll gap-12 hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <div className="h-10 w-20 opacity-60">
                  <svg viewBox="0 0 100 40" className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-orange-500 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-sm flex items-center gap-2"><span className="text-2xl">•</span>Best Deal No Limit</p>
              <h3 className="text-6xl font-bold underline mb-10">50%</h3>
              <p className="text-4xl mt-4">
                Book Cyber Truck <br /> with a big discount!
              </p>
              <button className="btn btn-neutral mt-5 rounded-2xl">Book Now</button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"
              className="rounded-2xl h-64 w-full md:w-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* CONCIERGE + TESTIMONIALS */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
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
              {/* FEATURES */}{" "}
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
              src="/images/woman-car.jpg"
              className="w-full h-[320px] md:h-[500px] object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 px-4 ">
          {" "}
          <p className="text-sm text-gray-600 mb-2 font-bold flex items-center gap-2">
            {" "}
            <span className="text-orange-500 text-2xl">•</span> Testimonials{" "}
          </p>{" "}
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            {" "}
            Real Stories That{" "}
            <span className="text-orange-500">Build Trust</span>{" "}
          </h2>{" "}
          <div className="grid md:grid-cols-3 gap-6">
            {" "}
            {/* CARD */}{" "}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
              {" "}
              <p className="text-orange-400 text-3xl">“</p>{" "}
              <p className="text-gray-500 text-sm mb-4">
                {" "}
                Didn't expect booking a car to be this stress-free. No delays,
                no hidden fees, just picked, paid and it was smooth.{" "}
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user1.jpg"
                  className="w-8 h-8 rounded-full"
                />{" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium">Fahad Paul</p>{" "}
                  <p className="text-xs text-gray-400">Lagos</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
              {" "}
              <p className="text-orange-400 text-3xl">“</p>{" "}
              <p className="text-gray-500 text-sm mb-4">
                {" "}
                The car was exactly as described. The booking process was
                straightforward and customer support was responsive.{" "}
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user2.jpg"
                  className="w-8 h-8 rounded-full"
                />{" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium">Kemi Ernest</p>{" "}
                  <p className="text-xs text-gray-400">Lagos</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
              {" "}
              <p className="text-orange-400 text-3xl">“</p>{" "}
              <p className="text-gray-500 text-sm mb-4">
                {" "}
                The booking experience was magical. No surprises, car arrived
                spotless. Will use again for sure.{" "}
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user3.jpg"
                  className="w-8 h-8 rounded-full"
                />{" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium">Tunde Smith</p>{" "}
                  <p className="text-xs text-gray-400">Lagos</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </section>

      {/* STATS */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-500 text-sm">Verified Cars Available</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">34k+</h3>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-gray-500 text-sm">Trusted Partners</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-gray-500 text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-20  justify-between items-start mt-10">
          <div>
            {" "}
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
              {" "}
              <span className="text-orange-500 text-2xl">•</span> Frequently Asked
              Questions{" "}
            </p>{" "}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {" "}
              Get <span className="text-orange-500">Answers</span> to Your
              Questions{" "}
            </h2>{" "}
            <p className="text-gray-500 mb-4">
              {" "}
              Find clear & helpful answers to the most common questions about
              our services, booking process, policies, and support.{" "}
            </p>{" "}
            <ul className="text-sm text-gray-600 space-y-2">
              {" "}
              <li>• 24/7 customer support</li> <li>• Professional service with Customer-first approach</li>{" "}
            </ul>{" "}
            <p className="mt-5">still have any question? <span className="text-orange-500">Contact our support team</span> anytime</p>
          </div>{" "}
          {/* FAQ LIST */}{" "}
          <div className="space-y-4">
            {" "}
            {[
              "How do I book a car?",
              "Can I rent a car with a driver?",
              "What payment options are available?",
              "What happens if I need to cancel my booking?",
              "Are the cars verified and in good condition?",
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white border border-white rounded-lg p-2 flex justify-between items-center cursor-pointer"
              >
                {" "}
                <span className="text-sm">{q}</span>{" "}
                <span className="text-xl">+</span>{" "}
              </div>
            ))}{" "}
          </div>
        </div>
      </section>
    </main>
  );
}
