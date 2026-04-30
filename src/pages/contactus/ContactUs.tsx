
// import React from 'react'

export default function ContactUs() {
  return (
    <div >
     <div className=""
     style={{
      backgroundImage: "url('/car1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "80vh",
      overflow: "hidden",
     }}>
      <div className="container mx-auto flex text-center justify-center mt-40">
        <div>
          <h1 className="text-white text-4xl font-semibold">Get in<span className="text-[#F97316]"> Touch</span> </h1>
          <p className="text-white mt-5">We're here to help you every step of the way! Whether you have questions,<br />feedback, or need support, our team is ready to assist you.</p>
          
        </div>
      </div>
      
     </div>

     <div>
      <div className=" min-h-screen bg-[#FAFAFA] text-white flex items-center justify-center px-6 py-12">
  <div className="  w-11/12 container mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-10">

   
    <div className="space-y-8">
      <div>
        <p className="text-sm text-black flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          We're ready to help
        </p>
        <h1 className="text-4xl font-semibold mt-2 text-black">Contact Us</h1>
      </div>

      <div className="grid grid-cols-2 gap-10">
        
        <div>
          
          <img src="icon1.png" alt="" />
          <h3 className="text-lg font-semibold text-black">Email Support</h3>
          <p className="text-gray-400 text-sm">Send us an email any time</p>
          <p className="text-orange-500 mt-2 font-medium">
            support@milescarrental.com
          </p>
        </div>

       
        <div>
         <img src="icon2.png" alt="" />
          <h3 className="text-lg font-semibold text-black">Phone Number</h3>
          <p className="text-gray-400 text-sm">
            Mon–Sat from 8am to 8pm
          </p>
          <p className="text-orange-500 mt-2 font-medium">
            +234 812 3333 3333
          </p>
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="grid grid-cols-2 gap-10">
    
        <div>
     <img src="icon3.png" alt="" />
          <h3 className="text-lg font-semibold text-black">Live Chat</h3>
          <p className="text-gray-400 text-sm">
            Chat with our agents now
          </p>
          <p className="text-orange-500 mt-2 font-medium">
            Start chat
          </p>
        </div>

        <div>
          <img src="icon4.png" alt="" />
          <h3 className="text-lg font-semibold text-black">Our Location</h3>
          <p className="text-gray-400 text-sm">
            Come say hello at our office
          </p>
          <p className="text-orange-500 mt-2 font-medium">
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <div className="bg-white rounded-2xl p-8 text-black">
      <form className="space-y-5">
        <input
          type="text"
          placeholder="Full name"
          className="w-full p-4 rounded-xl bg-[#F4F0EC] outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-4 rounded-xl bg-[#F4F0EC] outline-none"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="w-full p-4 rounded-xl bg-[#F4F0EC] outline-none"
          />
        </div>

        <select className="w-full p-4 rounded-xl bg-[#F4F0EC] outline-none">
          <option>Subject (select a topic)</option>
          <option>General Inquiry</option>
          <option>Booking</option>
        </select>

        <textarea
          rows="5"
          placeholder="Message (Tell us how we can help)"
          className="w-full p-4 rounded-xl bg-[#F4F0EC] outline-none"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-1 rounded-4xl flex items-center justify-center gap-2 hover:bg-orange-600 transition"
        >
          Send message
          <img src="arroww.png" alt="" className="" 
       />
        </button>

        <p className="text-medium text-gray-500">
          By submitting, you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  </div>
</div>
     </div>

     <div className="bg-orange-500 w-11/12 container mx-auto flex justify-between p-8 rounded-2xl">
      <div className="flex gap-2">
        <div className="bg-white p-4 rounded-2xl">
          <img src="public/Question Circle.svg" alt="" />
        </div>
        <div>
          <h2 className="text-white text-3xl">Have Questions?</h2>
          <p className="text-white mt-5">Check our FAQs — most answers are just a click away.</p>
        </div>
      </div>
      
      <div>
        <div className="bg-[#111827] pl-3 pr-3 pt-2 pb-2 flex rounded-2xl">
          <p className="text-white">View FAQ</p>
          <img src="arrow.png" alt="" />
        </div>
      </div>
     </div>

      </div>

  )
}

