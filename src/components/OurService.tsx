
const OurService = () => {
    const services = [
        {header: "Easy Booking", paragraph: "Reserve your ride in 2 minutes."},
        {header: "Big fleet of cars", paragraph: "From everyday rides to heavy-duty trucks."},
        {header: "Professional Drivers", paragraph: "Vetted, reliable, always on time."},
        {header: "Seamless Experience", paragraph: "Fast, smooth, and stress-free."},
    ]
  return (
    <div>
      <div className="w-11/12 container mx-auto ">
        <div className="lg:flex gap-10.5">
          <div className="flex flex-col h-full justify-center gap-5">
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              {" "}
              <span className="text-orange-500 text-2xl">•</span> Concierge
              Service{" "}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {" "}
              Discover a New Level of{" "}
              <span className="text-orange-500">Comfort</span>{" "}
            </h2>{" "}
            <p className="text-gray-500 mb-6 max-w-140 text-[18px]">
              {" "}
              Enjoy a seamless rental experience tailored to your needs. Our
              concierge service is designed to provide comfort, convenience,
              and dedicated support.{" "}
            </p>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-8">
              {services.map((service, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-gray-800 text-2xl">{service.header}</h4>
                  <p className="text-gray-500 mt-1">{service.paragraph}</p>
                </div>
              ))}
            </div>
            

          </div>
            <div className="flex justify-center">
              <img
                src="/image 26.png"
                className="object-cover rounded-2xl shadow-md w-full"
                alt=""
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default OurService