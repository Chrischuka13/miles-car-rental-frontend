import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";
import Buttons from "./ui/Buttons";
import Drawer from "./Drawer";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars/carListing" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <section>
      <header>
        <nav className="fixed top-0 w-full z-50 hover:backdrop-blur-sm bg-white hover:text-black transition hover:cursor-pointer">
          <div className="w-11/12 container p-4 mx-auto flex justify-between items-center">
            <Link to="/">
              <img src="/miles logo.svg" alt="logo" className="w-25" />
            </Link>
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

            {user ? (
              <div className="hidden lg:flex">
                <UserAvatar />
              </div>
            ) : (
              <div className=" hidden lg:flex items-center justify-center gap-4 ">
                <Link to="/auth/login">Sign In</Link>
                <Link to="/auth/register">
                  <Buttons text="Get Started" />
                </Link>
              </div>
            )}

            <Drawer />
          </div>
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
