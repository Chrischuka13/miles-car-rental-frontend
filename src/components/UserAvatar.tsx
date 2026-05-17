
import { useAuth } from "@/hooks/useAuth";
import {
  CreditCardIcon,
  ChevronDown,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function UserAvatar() {
  const { user, handleLogout } = useAuth();
  return (
            <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="default">
                      <div className="hidden lg:flex items-center justify-center gap-4 hover:cursor-pointer py-5">   
                        <span className="text-xl border text-whit bg-amber-600 rounded-full p-1">
                          {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}
                        </span>                 
                      </div>{user?.firstName} {user?.lastName} <ChevronDown/></Button>} />
                    <DropdownMenuContent className={`mt-4`}>
                        <DropdownMenuItem>
                            <UserIcon />Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCardIcon />Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SettingsIcon />Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOutIcon/><button onClick={handleLogout}>Sign Out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
  );
}
