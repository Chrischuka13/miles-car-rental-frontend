import { CalendarDays, CarFront, Grid2x2, LogOut, Settings, UserCog, Users } from "lucide-react";
import Logo from "./Logo";
import { NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { handleLogout } = useAuth();

  return (
    <aside className="hidden px-2 mx-auto  lg:block  min-h-screen   fixed z-40 w-60">
      
      <div className="p-4 flex">
        <Logo />
      </div>

      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
          }`
        }
      >
        <Grid2x2 /> <h1>Dashboard</h1>
      </NavLink>

      <NavLink
        to="/admin/bookings"
        className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
          }`
        }
      >
        <CalendarDays /> <h1>Bookings</h1>
      </NavLink>

      <NavLink
        to="/admin/fleet"
       className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
          }`
        }
      >
        <CarFront /> <h1>Fleet</h1>
      </NavLink>

      <NavLink
        to="/admin/customers"
       className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
          }`
        }
      >
        <Users /> <h1>Customers</h1>
      </NavLink>

      <NavLink
        to="/admin/drivers"
        className={({ isActive }) =>
          `transition-all duration-300 ease-in p-3  flex items-center gap-2 rounded-3xl w-50 mb-3 ${
            isActive ? "bg-[#F97316] text-white  border-3" : "hover:text-[#F97316] "
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

      <div className="p-4 flex gap-2" onClick={handleLogout}>
        <LogOut /> <p className="text-red-600">Logout</p>
      </div>
    </aside>
  );
}