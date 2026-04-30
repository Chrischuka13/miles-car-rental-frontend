// import useMetaArgs from "@/hooks/useMeta";
import TrendingCars from "../../sections/TrendingCars";
import heroImage from "/Frame 39.jpg";


export default function Home() {
//   useMetaArgs({
//     title: "Home, Miles Car Rental",
//     description: "Welcome to Miles Car Rental!",
//     keywords: "car rental, rent a car, luxury cars, trucks, buses, Nigeria",
//   });

  return (
    <main className="text-base-content bg-[#F9F9F9]">

      {/* HERO */}
      <section
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.20)), url(${heroImage})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
          <div className="text-center text-white max-w-5xl mx-auto">
         <div className="badge badge-outline bg-[#4A4D54] border-white/30 text-orange-500 px-5 py-1 rounded-full mb-6 mt-15 lg:mt-5 inline-flex items-center justify-center max-w-fit text-center">
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
              <button className="btn bg-orange-500 hover:bg-orange-600 border-none rounded-full px-8 py-2 cursor-pointer text-white">
                Book Now
              </button>
              <button className="btn bg-white rounded-full px-5 py-2 cursor-pointer text-gray-800 hover:bg-gray-100">
                Explore Cars
              </button>
            </div>
          </div>

         
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

      
      <section className="py-15">
        <div className="w-11/12 container p-4  mx-auto  items-center">
          <div className="flex gap-2 text-center items-center font-semibold ">
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
                  <img src="/public/Frame 114 (1).png" className="w-10 h-10" alt="" />
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

      {/* TRENDING */}
      <section className=" w-full mt-20  bg-white">
        <div className="w-11/12 container p-4 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Trending <span className="text-orange-500">cars</span> for The
              Week
            </h3>

            <button className="btn btn-ghost text-orange-500 self-start cursor-pointer md:self-auto">
              Explore full fleet
            </button>
            
          </div>
          <div className="flex gap-10 w-full mb-10 ">
            <TrendingCars />
          </div>
       
          
        </div>
        
      </section>
        
   <section className="bg-white mt-10 py-6 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-5 md:grid-cols-10 gap-4 items-center justify-items-center">

      {[
        "/Vector.png",
        "/simple-icons_volkswagen.png",
        "/simple-icons_suzuki.png",
        "/simple-icons_ford.png",
        "/simple-icons_hyundai.png",
        "/cbi_peugeot.png",
        "/cbi_toyota.png",
        "/fontisto_tesla.png",
        "/simple-icons_iveco.png",
        "/lineicons_nissan.png",
      ].map((logo, index) => (
        <div
          key={index}
          className={`group flex items-center justify-center rounded-2xl p-3 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:bg-gray-50 ${
            index >= 5 ? "hidden md:flex" : "flex"
          }`}
        >
          <img
            src={logo}
            alt="car brand logo"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-80 transition-all duration-300 group-hover:opacity-100"
          />
        </div>
      ))}

    </div>
  </div>
</section>

      
      <section className="py-16">
      <div className="w-11/12 container p-4 mx-auto">
  <div className="rounded-3xl bg-orange-500 text-white p-8 md:p-12 flex flex-col md:flex-row items-center">
    
   
    <div className="w-full md:w-1/2">
      <p className="text-sm flex items-center gap-2">
        <span className="text-2xl">•</span>
        Best Deal No Limit
      </p>

      <h3 className="text-6xl font-bold underline mb-10">50%</h3>

      <p className="text-4xl mt-4">
        Book Cyber Truck <br /> with a big discount!
      </p>

      <button className="btn bg-black py-2 px-5 mt-5 rounded-2xl">
        Book Now
      </button>
    </div>


    <div className="w-full md:w-1/2">
      <img
        src="/unsplash__JkqGe0ufU8.png"
        className="h-50 md:h-full w-full object-cover"
        alt="Cyber Truck"
      />
    </div>

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

        <div className="w-11/12 container p-4 mx-auto py-16">
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
           
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 min-h-[280px] flex flex-col justify-between">
              {" "}
            <img src="/Vector.svg" className="w-12 h-12 py-2" alt="quote_icon" />
              <p className="text-gray-500 text-lg mb-4">
                {" "}
                Didn’t expect booking a car to be this stress-free tbh. No calls, no back and forth. Just picked, paid, and it was sorted.
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user1.jpg"
                  className="w-8 h-8 rounded-full"
                  alt="Fahad Paul"
                />{" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium">Fahad Paul</p>{" "}
                  <p className="text-xs text-gray-400">Lagos</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 min-h-[280px] flex flex-col justify-between">
              <img src="/Vector.svg" className="w-12 h-12 py-2" alt="quote_icon" />
              <p className="text-gray-500 text-lg mb-4">
                {" "}
                The car was exactly as described. The booking process was straightforward, and customer support was very responsive.
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user2.jpg"
                  className="w-8 h-8 rounded-full"
               alt="" />{" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium">Kemi Ernest</p>{" "}
                  <p className="text-xs text-gray-400">Lagos</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 min-h-[280px] flex flex-col justify-between">
              {" "}
              <img src="/Vector.svg" className="w-12 h-12 py-2" alt="quote_icon" />
              <p className="text-gray-500 text-lg mb-4">
                {" "}
                The booking experience was magical. No paperwork drama, car arrived spotless. Miles car rental is now my default.
              </p>{" "}
              <hr className="m-3 text-gray-400 w-full"/>
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src="/users/user3.jpg"
                  className="w-8 h-8 rounded-full"
                alt=""/>{" "}
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

{/* FAQ */}      
      <section className="w-full bg-gray-50">
        <div className="w-11/12 container p-4 mx-auto grid md:grid-cols-2 gap-20  justify-between items-start mt-10">
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


          {/* FAQ LIST */}
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
