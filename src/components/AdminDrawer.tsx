import { CalendarDays, CarFront, Grid2x2, LogOut, Menu, Settings, UserCog, Users, X } from "lucide-react";
import Logo from "./Logo";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-[#F97316]"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white z-50 px-2 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <Logo />
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <NavLink
          to="/admin"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
              isActive ? "bg-[#F97316] text-white border-3" : "hover:text-[#F97316]"
            }`
          }
        >
          <Grid2x2 /> <h1>Dashboard</h1>
        </NavLink>

        <NavLink
          to="/admin/bookings"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
              isActive ? "bg-[#F97316] text-white border-3" : "hover:text-[#F97316]"
            }`
          }
        >
          <CalendarDays /> <h1>Bookings</h1>
        </NavLink>

        <NavLink
          to="/admin/fleet"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
              isActive ? "bg-[#F97316] text-white border-3" : "hover:text-[#F97316]"
            }`
          }
        >
          <CarFront /> <h1>Fleet</h1>
        </NavLink>

        <NavLink
          to="/admin/customers"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
              isActive ? "bg-[#F97316] text-white border-3" : "hover:text-[#F97316]"
            }`
          }
        >
          <Users /> <h1>Customers</h1>
        </NavLink>

        <NavLink
          to="/admin/drivers"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
              isActive ? "bg-[#F97316] text-white border-3" : "hover:text-[#F97316]"
            }`
          }
        >
          <UserCog /> <h1>Drivers</h1>
        </NavLink>



        <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3 mt-15 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
          }`
        }
      >
        <Settings/> <h1>Settings</h1>
      </NavLink>

        <div
          className="p-4 flex gap-2 cursor-pointer hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut /> <p className="text-red-600">Logout</p>
        </div>
      </aside>
    </>
  );
}