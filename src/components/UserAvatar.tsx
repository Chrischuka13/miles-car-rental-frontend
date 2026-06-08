import { ChevronDown, Lock, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export default function UserAvatar() {
  const { user, handleLogout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="border-0 hidden bg-transparent hover:bg-transparent lg:flex text-xl "
          >
            <span className="text-xl border text-white bg-amber-600 rounded-full p-1">
              {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}
            </span>
            {user?.firstName} {user?.lastName}
            <ChevronDown />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className="flex flex-col gap-3">
            {user && (
              <Link to="/my-bookings" className="text-lg">View Bookings</Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <div className="flex gap-2 items-center text-lg">
                  <Lock />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>

        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
