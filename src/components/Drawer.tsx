import { useState } from "react";
import { Link } from "react-router";

import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { Lock, LogOut, Menu, X } from "lucide-react";
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

          {user?.role === "admin" && (
            <li>
              <Link to="/admin">
                <div className="pl-1 flex gap-2 items-center pt-4">
                  <Lock />
                  <span className="">Admin</span>
                </div>
              </Link>
            </li>
          )}

          {/* Mobile auth */}
          {!isAuthenticating && (
            <div className="mt-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <UserAvatar />
                  <button // 👈 added logout button
                    onClick={handleLogout}
                    className="text-red-500 flex gap-2 text-lg font-normal text-left hover:text-red-600"
                  >
                    <LogOut /> Logout
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
        </div>
      </div>
    </>
  );
}
