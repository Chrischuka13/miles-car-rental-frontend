import UserAvatar from "./UserAvatar";

import { CalendarDays } from "lucide-react";
import AdminDrawer from "./AdminDrawer";

export default function AdminNav() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="md:fixed top-0 left-55 right-0 z-50 bg-white">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <CalendarDays />
          <p className=" ">{currentDate}</p>
        </div>

        <div className="flex gap-6 items-center">
          <div className="hidden">
          <UserAvatar />
          </div>

          <AdminDrawer />
        </div>
      </div>
    </div>
  );
}
