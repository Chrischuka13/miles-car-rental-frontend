<<<<<<< HEAD
import { Menu, X } from "lucide-react";
=======
>>>>>>> 89be6dd4c6a77c4895872b8db38b080abf155150
import { useState } from "react";
import { Link } from "react-router";

import Logo from "./Logo";
<<<<<<< HEAD
import { NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function Drawer({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const closeAction = () => {
    handleLogout();
    setIsOpen(false);
  };
  return (
    <>
      <Menu onClick={() => setIsOpen(true)} className="md:hidden text-white" />
      <div
        className={`drawer fixed top-0 bg-(--darkgrey) left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu bg-(--navBg) text-base-content min-h-full w-90 p-4">
            <Logo />
            <button
              className="absolute right-3 top-8 btn btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="text-white" />
            </button>
            {user ? (
              <div className="mt-6">
                <h1 className="text-xl text-white font-semibold capitalize">
                  Hi, {user.fullname}
                </h1>
                <div className="flex flex-col text-white  mt-4 gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-xl"
                  >
                    Profile
                  </Link>

                  <div className="flex flex-col  gap-3 text-xl text-white">
                    {/* <a>Services</a>
                    <a>About Us</a>
                    <a>Contact Us</a> */}
                    {user && (
                      <NavLink
                        to="/book-laundry"
                        style={({ isActive }) => ({
                          color: isActive ? "rgb(98, 85, 236)" : "white",
                          textDecoration: "none",
                        })}
                      >
                        Book Laundry
                      </NavLink>
                    )}
                  </div>
                  {user?.role === "admin" && (
                    <div className="text-xl">
                      <Link to="/admin" onClick={()=> setIsOpen(false)}>Admin</Link>
                    </div>
                  )}

                  <a
                    href="#"
                    onClick={closeAction}
                    className="font-medium text-xl text-white mt-5"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-10 gap-4 text-white ">
                {" "}
                <Link
                  to="/auth/createAccount"
                  className="font-medium text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth/login"
                  className="font-medium text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
=======
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Menu, X } from "lucide-react";
import UserAvatar from "./UserAvatar";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticating, handleLogout } = useAuth(); 

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden hover:cursor-pointer text-[#F97316]"
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>
      <div
        className={`
          fixed top-0 left-0 h-full w-3/4 max-w-xs z-40
          bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-1">
          {/* Greeting */}
          {user && (
            <h3 className="text-lg font-semibold capitalize mb-4 text-[#111827]">
              Hi, {user.firstName} {user.lastName}
            </h3>
          )}

          {/* Nav links */}
          {[
            { label: "Home", to: "/" },
            { label: "Cars", to: "/cars" },
            { label: "About Us", to: "/about" },
            { label: "Contact Us", to: "/contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className="py-3 text-lg font-normal text-[#111827] border-b border-gray-100 hover:text-gray-400"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile auth */}
          {!isAuthenticating && (
            <div className="mt-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <UserAvatar />
                  <button  // 👈 added logout button
                    onClick={handleLogout}
                    className="text-red-500 flex gap-2 text-lg font-normal text-left hover:text-red-600"
                  >
                   <LogOut/> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-[#111827] text-center border rounded-3xl  p-3 hover:text-gray-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/createAccount"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#F97316] text-white px-4 py-2 rounded-3xl text-lg font-normal text-center hover:opacity-90"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
>>>>>>> 89be6dd4c6a77c4895872b8db38b080abf155150
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 89be6dd4c6a77c4895872b8db38b080abf155150
