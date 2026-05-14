
import {
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export default function UserAvatar() {
  const { user, handleLogout } = useAuth();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="border-0 hidden bg-transparent hover:bg-transparent lg:flex text-xl p-5">
            <span className="text-xl border text-whit bg-amber-600 rounded-full p-1">
              {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}
            </span>
            {user?.firstName} {user?.lastName}
            <ChevronDown />{" "}
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
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
