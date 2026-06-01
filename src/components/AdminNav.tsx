import UserAvatar from "./UserAvatar";

import { BellDot, CalendarDays } from "lucide-react";
import AdminDrawer from "./AdminDrawer";

export default function AdminNav() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed bg-[#FFFFFF] top-0 w-full  z-10 p-4 ">
      <div className="lg:container lg:pr-30 flex justify-between">
        <div className="hidden  lg:flex gap-1 border  px-2 rounded-lg p-2 ">
          <CalendarDays />
          <p className=" ">{currentDate}</p>
        </div>
        <BellDot className="md:ml-160 my-auto md:justify-center md:items-center " />

        <div className="flex gap-6 items-center">
          <UserAvatar />
          <AdminDrawer />
        </div>
      </div>
    </div>
  );
}
