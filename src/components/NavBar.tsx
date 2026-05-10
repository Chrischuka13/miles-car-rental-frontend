import React from "react";
import { useState } from "react";
import {
  CreditCardIcon,
  LogOutIcon,
  Menu,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { X } from "lucide-react";
import { Link, NavLink } from "react-router";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { Button } from "./ui/button";

// import { Link } from "react-router"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <header className="">
        <nav className="fixed w-full z-50  hover:backdrop-blur-sm bg-white hover:text-black transition">
          <div className="w-11/12 container p-4 mx-auto flex justify-between items-center">
            <img src="/miles logo.svg" alt="logo" className="w-25" />
            <div className="hidden md:flex gap-7 items-center text-DarkBlue">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
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

             <div className="hidden lg:flex items-center justify-center gap-4 ">
              <Link to="/auth/login">Sign In</Link>
              <div className="flex bg-DarkBlue items-center justify-center p-2 px-5 rounded-[25px]">
                <Link to="/auth/register" className="text-white ">Get Started</Link>
                <div>
                  <img src="/stash_arrow-down-duotone.svg" alt="" />
                </div>
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

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden hover:cursor-pointer"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
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
                  to="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Contact Us
                </NavLink>

                <div className="lg:hidden">
                  <button className="border rounded-[25px] p-2 px-5 border-DarkBlue w-full mb-4">
                    <Link to="/auth/login">Sign in</Link>
                  </button>

                  <div className="flex bg-DarkBlue items-center justify-center p-2 px-5 rounded-[25px]">
                    <button className="text-white">Get Started</button>
                    <div>
                      <img src="/stash_arrow-down-duotone.svg" alt="" />
                    </div>
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
