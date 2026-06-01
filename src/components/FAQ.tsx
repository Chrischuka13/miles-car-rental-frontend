import { useState } from 'react'
import { Plus  } from 'lucide-react'
import { Minus } from 'lucide-react'

    const FAQs = [
    {question: "How do i book a car?", answer: "Simply select your preferred vehicle, choose your rental dates and location, and proceed to checkout. Once payment is confirmed, your booking is secured instantly."},
    {question: "Can I rent a car with a driver?", answer: "Yes. You can choose to rent with or without a driver during the booking process. Driver availability and pricing will be clearly shown before you confirm."},
    {question: "What payment options are available?", answer: "We support secure online payments. Depending on the car, you may choose to pay in full or make a partial deposit to confirm your booking."},
    {question: "What happens if I need to cancel my booking?", answer: "You can cancel your booking based on our cancellation policy. Eligible bookings may receive a partial or full refund depending on the timing of the cancellation."},
    {question: "Are the cars verified and in good condition?", answer: "Yes. All cars on our platform are verified and regularly maintained to ensure safety, comfort, and reliability for every trip."},
]

const FAQ = () => {
    const [Isopen, SetisOpen] = useState<number | null>(null)

    const toggle = (index) => {
    SetisOpen(Isopen === index ? "" : index);
  };


  return (
    <section className='py-12'>
        <div className="w-11/12 container mx-auto grid md:grid-cols-2 gap-20 items-stretch mt-10 mb-10">
          <div className="flex flex-col justify-between h-fit">
            {" "}
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2 font-semibold">
              {" "}
              <span className="text-orange-500 text-2xl">•</span> Frequently
              Asked Questions{" "}
            </p>{" "}
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-4">
              {" "}
              Get <span className="text-orange-500">Answers</span> to Your
              Questions{" "}
            </h2>{" "}
            <p className="text-gray-500 mb-8 text-[18px]">
              {" "}
              Find clear & helpful answers to the most common questions about
              our services, booking process, policies, and support.{" "}
            </p>{" "}
            <ul className="text-[18px] text-gray-600 space-y-2">
              {" "}
              <li className="flex gap-2 items-center mb-3">
                <img src="/Frame 114b.png" alt="icon" /> 24/7 customer
                support
              </li>{" "}
              <li className="flex gap-2 items-center">
                <img src="/Frame 114b.png" alt="icon" /> Professional
                service with Customer-first approach
              </li>{" "}
            </ul>{" "}
            <p className="mt-4 text-[18px]">
              still have any question?{" "}
              <span className="text-orange-500">Contact our support team</span>{" "}
              anytime
            </p>
          </div>
          
          <div>
            {FAQs.map((faq, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between text-start md:items-center text-lg font-semibold text-gray-800 hover:text-orange-500 p-4 rounded-xl transition-all duration-300"
                >
                  {faq.question}
                  {Isopen === index ? <Minus /> : <Plus />}
                </button>
                {Isopen === index && (
                  <p className="mt-3 p-4 rounded-xl text-white bg-DarkBlue">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default FAQ