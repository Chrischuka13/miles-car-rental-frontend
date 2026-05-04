import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { Link } from "react-router"

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <header className="">
        <nav className="fixed w-full z-20 bg-neutral-100 transition hover:cursor-pointer ">
          <div className="w-11/12 container p-4 mx-auto flex justify-between items-center">
            <img src="public/miles.png" alt="logo" className="w-[100px]" />
            <div className="hidden lg:flex gap-6 items-center text-[#0A0A0A]">
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
              >
                Home
              </a>
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
              >
                Cars
              </a>
              <a
                href="/"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
              >
                About Us
              </a>
              <Link to = "/contactus"
                className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
              >
                Contact Us
              </Link>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex items-center justify-center gap-4">
                  <img
                    className="w-10 rounded-full"
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                  <p>Bright Ekpan</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden hover:cursor-pointer"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-white text-[#0A0A0A] text-start h-screen md:h-full">
              <div className="w-11/12 container mx-auto py-4">
                <h6 className="mb-4">Discover</h6>
                <a
                  href="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Home
                </a>
                <a
                  href="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Cars
                </a>
                <a
                  href="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  About Us
                </a>
                <a
                  href="/"
                  className="block font-normal text-xl hover:text-gray-400 hover:cursor-pointer mb-4"
                >
                  Contact Us
                </a>

                <div className="w-full bg-neutral-100 p-4 rounded-2xl mt-8">
                  <img src="/images/naija.png" alt="" className="w-9" />
                  <p>Nigeria</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
