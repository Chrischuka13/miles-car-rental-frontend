import React from "react";
import { useState } from "react";
import { CreditCardIcon, LogOutIcon, Menu, SettingsIcon, UserIcon } from "lucide-react";
import { X } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { Button } from "./ui/button";


// import { Link } from "react-router"

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <header className="">
        <nav className="fixed w-full z-20 bg-neutral-50 transition hover:cursor-pointer ">
          <div className="w-11/12 container p-4 mx-auto flex justify-between items-center">
            <img src="/miles logo.svg" alt="logo" className="w-[100px]" />
            <div className="hidden md:flex gap-7 justify-center items-center text-DarkBlue">
              <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Home</a>
              <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Cars</a>
              <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">About Us</a>
              <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Contact Us</a>
            </div>

            
              
                <div className="hidden md:flex items-center justify-center gap-4 ">
                    <a href="/">Sign In</a>
                  <div className="flex bg-DarkBlue items-center justify-center p-2 px-5 rounded-[25px]">
                    <p className="text-white">Get Started</p>
                    <div><img src="/stash_arrow-down-duotone.svg" alt="" /></div>
                  </div>
                </div>
              
            

                {/* <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="default"><div className="hidden lg:flex items-center justify-center gap-4 hover:cursor-pointer"><img className="w-10 rounded-full " alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/><p>Bright Ekpan</p></div></Button>} />
                    <DropdownMenuContent className={`mt-4`}>
                        <DropdownMenuItem>
                            <UserIcon />Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCardIcon />Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SettingsIcon />Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOutIcon className="text-red-800" /><p className="text-red-800">Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden hover:cursor-pointer">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-white text-[#0A0A0A] text-start h-screen md:h-full">
              <div className="w-11/12 container mx-auto py-4">
                <h6 className="mb-4">Discover</h6>
                <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Home</a>
                <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Cars</a>
                <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">About Us</a>
                <a href="/" className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4">Contact Us</a>

                <div className="md:hidden mt-10">
                    <button className="border rounded-[25px] p-2 px-5 border-DarkBlue w-full mb-4">Sign In</button>
        
                  <div className="flex bg-DarkBlue items-center justify-center p-2 px-5 rounded-[25px]">
                    <button className="text-white">Get Started</button>
                    <div><img src="/stash_arrow-down-duotone.svg" alt="" /></div>
                  </div>
                </div>

                {/* <div className="lg:hidden flex items-center mt-10 gap-4 hover:cursor-pointer"><img className="w-10 rounded-full " alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/><p>Bright Ekpan</p></div> */}
              </div>
            </div>
          )}
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
