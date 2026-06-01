import { useAuth } from "@/hooks/useAuth"
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

export default function UserAvatar() {
  const {user, handleLogout} = useAuth()
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  
  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="relative" ref={dropdownRef}>
        {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-white bg-DarkBlue rounded-xl shadow hover:bg-DeepOrange transition-all duration-200"
      >
        <span>{user?.firstName}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <ul className="py-2">
            <li>
              <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition">
              <Link to="/admin">Dashboard</Link></button>
              <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-red-800 hover:bg-gray-100 hover:text-blue-600 transition">
              Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
