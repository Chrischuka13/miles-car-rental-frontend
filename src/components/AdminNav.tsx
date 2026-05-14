import {  useSearchParams } from "react-router";
import UserAvatar from "./UserAvatar";


import { BellDot, CalendarDays } from "lucide-react";
import AdminDrawer from "./AdminDrawer";

export default function AdminNav() {
  const [searchParams, setSearchParams] = useSearchParams();

 

  const query = searchParams.get("query") || "";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="sticky bg-[#FFFFFF] top-0 w-full   p-4 z-30">
      <div className="container mx-auto flex lg:gap-4 items-center justify-between">
        <label className="input flex gap-2 items-center text-black ">
          <svg
            className="h-[1em] opacity-50 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="input-lg w-60 md:w-100  lg:w-80  border p-1 rounded-2xl "
            defaultValue={query}
          />
        </label>
        <div className="hidden  lg:flex gap-1 border ml-25 px-2 rounded-lg p-2 ">
          <CalendarDays />
          <p className=" ">{currentDate}</p>
        </div>
        <BellDot className="md:ml-35 "/>

        <div className="flex gap-6 items-center">
          <UserAvatar />
          <AdminDrawer />
        </div>
     
      </div>
    </div>
  );
}
