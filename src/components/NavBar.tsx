

import React from "react";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";




const navItems = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars/carListing" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, handleLogout} = useAuth();

  return (
    <section>
      <header className="">
        <nav className="fixed w-full z-50  hover:backdrop-blur-sm bg-white hover:text-black transition">
          <div className="w-11/12 container p-4 mx-auto flex justify-between items-center">
            <Link to='/'><img src="/miles logo.svg" alt="logo" className="w-25" /></Link>
            <div className="hidden md:flex gap-7 items-center text-DarkBlue">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "border-b-2 border-DeepOrange "
                    : "text-DarkBlue hover:bg-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
            </div>

              {user? (
                <div className="hidden lg:flex">
                  <UserAvatar/>
                </div>
                
              ) : (
             <div className="hidden lg:flex items-center justify-center gap-4 ">
                <div className="flex bg-DarkBlue items-center justify-center p-3 px-5 rounded-[25px]">
                  <Link to="/auth/register" className="text-white ">Get Started</Link>
                  <div>
                    <img src="/arroww.png" alt="" />
                  </div>
                </div>
              
              <Link to="/auth/login">Sign In</Link>

            </div>
              )}

            {/* Hamburger — mobile only */}
                    <div onClick={()=> setIsOpen(!isOpen)} className="md:hidden block hover:cursor-pointer">
                        {isOpen? <X/> : <Menu/>} 
                    </div>
          </div>
          

          {isOpen && (
            <div className="lg:hidden bg-white text-[#0A0A0A] text-start md:h-full">
              <div className="w-11/12 container mx-auto py-4">
                <h6 className="mb-4">Discover</h6>
                <NavLink
                  to="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Cars
                </NavLink>
                <NavLink
                  to="/about"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Contact Us
                </NavLink>

                <div className="lg:hidden">
                  {user? (
                    <div className="flex justify-between">
                      <div className="bg-DarkBlue p-2 text-white rounded-lg max-w-30">{user.firstName}</div>
                      <button onClick={handleLogout} className="text-white rounded-lg max-w-30 p-2 bg-red-800">Sign Out</button>
                    </div>
                    
                  ):(
                    <div>
                  <button className="border rounded-[25px] p-2 px-5 border-DarkBlue w-full mb-4">
                    <Link to="/auth/login">Sign in</Link>
                  </button>

                  <div className="flex bg-DarkBlue items-center justify-center p-2 px-5 rounded-[25px]">
                    <button className="text-white">
                      <Link to='/auth/register'>Get Started</Link></button>
                    <div>
                      <img src="/stash_arrow-down-duotone.svg" alt="" />
                    </div>
                  </div>
                    </div>
                  )}

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
