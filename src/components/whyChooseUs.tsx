

const whyChooseUs = () => {
    const questons = [
        {header: "Easy Booking Process", paragraph: "Book your vehicle in under 2 minutes with our simple flow"},
        {header: "Wide Range of Cars", paragraph: "Book your vehicle in under 2 minutes with our simple flow"},
        {header: "Transparent Pricing", paragraph: "What you see is what you pay. No hidden fees, ever."},
        {header: "Verified and Reliable", paragraph: "Every vehicle inspected and every partner background-checked."}
    ]

  return (
    <section>
      {/* Why Choose Us */}
      <div className="w-full bg-white py-16">
        <div className="w-11/12 container mx-auto lg:flex gap-10.5 ">
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
              <span className="text-orange-500 text-3xl text-balance">•</span> Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
              We’re BIG on{" "}
              <span className="text-orange-500">
                What <br className="md:hidden" />Matters
              </span>{" "}
              to You
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questons.map((question, i) =>(
                <div key={i} className="rounded-lg flex flex-col mb-10">       
                    <img src="/Frame 114.png" className="w-12 rounded-full mb-4" alt="" />          
                    <h4 className="font-semibold text-gray-800 text-2xl">
                      {question.header}
                    </h4>
                    <p className="text-gray-500 mt-1">
                      {question.paragraph}
                    </p>
                </div>
            ))}
            </div>
  
          </div>

          <div className="flex justify-center">
            <img
              src="/Frame 96.png"
              className="object-cover rounded-2xl shadow-md w-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default whyChooseUs