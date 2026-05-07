

function Testimonial() {
  const testimonials = [
    {quoteimg: "public/Vector.svg", quote: "Didn’t expect booking a car to be this stress-free tbh. No calls, no back and forth. Just picked, paid, and it was sorted.", img: "/user1.jpg", name: "Fahad Paul", location: "Lagos"},
    {quoteimg: "public/Vector.svg", quote: "The car was exactly as described. The booking process was straightforward, and customer support was very responsive.", img: "/user2.jpg", name: "Kemi Ernest", location: "Lagos"},
    {quoteimg: "public/Vector.svg", quote: "The booking experience was magical. No paperwork drama, car arrived spotless. Miles car rental is now my default.", img: "/user3.jpg", name: "Tunde Smith", location: "Lagos"}
  ]
  return (
    <main className=''>
      <div className="w-11/12 container mx-auto py-16">
          {" "}
          <p className="text-sm text-gray-600 mb-2 font-bold flex items-center gap-2">
            {" "}
            <span className="text-orange-500 text-2xl">•</span>{" "}
            Testimonials{" "}
          </p>{" "}
          <h2 className="text-3xl md:text-4xl mb-10 font-semibold">
            {" "}
            Real Stories That{" "}
            <span className="text-orange-500">Build Trust</span>{" "}
          </h2>{" "}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((card, i)=>(
            <div key={i} className="w-full rounded-[15px] bg-white border border-[#E6E0E0] p-6 mb-6">
              <img src={card.quoteimg} alt="" className="size-10 mb-4" />
              <h6 className="mb-4 text-[#4B5563]">{card.quote}</h6>
              <hr  className="mb-4"/>

              <div className="flex gap-2">
                <img src={card.img} alt="" className="size-10 rounded-full bg-gray-800 outline -outline-offset-1 outline-white"/>
                <div className="flex flex-col">
                  <p className="text-[14px]">{card.name}</p>
                  <p className="text-[12px] text-[#4B5563]">{card.location}</p>
                </div>
              </div>
            </div>
          ))}
          </div>

      </div>
    </main>
  )
}

export default Testimonial