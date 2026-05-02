

const Footer = () => {
  return (
    <footer className="bg-DarkBlue">
        <div className="w-11/12 container mx-auto py-12">
            <div className="md:grid grid-cols-4 gap-5 text-[#D6D6D6] ">
                <div className="mb-6">
                    <img src="public/miles white.png" alt=""  className="w-25.5 mb-4"/>
                    <h5 className="mb-4">Nigeria's most loved car rental — built around your journey. From quick city runs to weekend escapes, we get you moving in minutes.</h5>
                    <div className="">
                        <div className="flex items-center mb-2 gap-2.5">
                            <img src="/location.svg" alt="" />
                            <a href="">13, Alfred Bani Road, Lagos Island</a>
                        </div>
                        <div className="flex items-center mb-2 gap-2.5">
                            <img src="/call.svg" alt="" />
                            <a href="">+23470-000-0000-00</a>
                        </div>
                        <div className="flex items-center mb-2 gap-2.5">
                            <img src="/mail.svg" alt="" />
                            <a href="">hello@milescarrental.com</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <h5 className="font-medium text-white text-2xl">Quick Links</h5>
                    <a href="">Home</a>
                    <a href="">Cars</a>
                    <a href="">About Us</a>
                    <a href="">Contact Us</a>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <h5 className="font-medium text-white text-2xl">Services</h5>
                    <a href="">Economy Car Rental</a>
                    <a href="">Luxury Car Rental</a>
                    <a href="">SUV Rental Services</a>
                    <a href="">Truck Rental Services</a>
                    <a href="">Bus Rental Services</a>
                </div>

                <div>
                    <h5 className="text-white font-medium text-2xl mb-4">Stay in the loop</h5>
                    <p className="text-[16px] mb-4">Deals, new arrivals and travel guides.</p>
                    <div className="relative">
                        <input type="email" placeholder="Your email" className="p-4  bg-[#FFFFFF33] rounded-lg w-full border-none text-[#D6D6D6]"/>
                        <button className="absolute top-2 right-2 p-2 bg-[#FF4F00] rounded-lg w-22.5 text-white mb-4 hover:bg-[#FF4F39] hover:cursor-pointer font-semibold">JOIN</button>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <a href="/" target="_blank"><img src="/streamline-plump_facebook-1.svg" alt="" /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/linkedin-01.svg" alt="" /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/iconoir_google.svg" alt="" /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/instagram.svg" alt="" /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/new-twitter-rectangle.svg" alt="" /></a>
                    </div>
                </div>
            </div>

            <div className="md:flex justify-between mt-12 ">
                <div className="text-[#A1A1A1] mb-4">©2026 Miles car rental. All rights reserved.</div>
                <div className="flex gap-3">
                    <a href="" className="text-[#A1A1A1]">Privacy Policy</a>
                    <a href="" className="text-[#A1A1A1]">Terms of Use</a>
                    <a href="" className="text-[#A1A1A1]">Cookies</a>
                </div>
            </div>

            <div className="mt-6">
                <img src="/miles1.png" alt="" />
            </div>
        </div>
    </footer>
  )
}

export default Footer