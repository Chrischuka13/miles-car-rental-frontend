

import React from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";
import Logo from "./Logo";
import Drawer from "./Drawer";

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <section>
      <header className="">
        <nav className="flex justify-center items-center px-2 fixed w-full z-20 bg-neutral-100 transition hover:cursor-pointer ">
          <div className=" container p-3 mx-auto  flex justify-between items-center">
            <Logo />
            <div className="hidden lg:flex gap-6 justify-center items-center text-[#111827]">
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer "
              >
                Home
              </a>
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer "
              >
                Cars
              </a>
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer "
              >
                About Us
              </a>
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer "
              >
                Contact Us
              </a>
            </div>

            {/* Desktop auth section */}
            {user ? (
              <UserAvatar />
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/auth/login"
                  className="text-xl font-normal hover:text-gray-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/createAccount"
                  className="bg-[#111827] flex justify-center items-center text-white px-3 py-2 rounded-4xl text-xl font-normal hover:opacity-90"
                >
                  Get started <div>
                   <img src="/stash_arrow-down-duotone (1).svg" alt="" className=""/> </div> 
                </Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
           
          </div>
        <Drawer />
        </nav>
         
      </header>
        
    </section>
  );
};

export default NavBar;
