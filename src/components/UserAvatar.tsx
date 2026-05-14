
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
                      <div className="hidden lg:flex items-center justify-center gap-4 hover:cursor-pointer">                    
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
                            <LogOutIcon className="text-red-800" onClick={handleLogout}/><p className="text-red-800">Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
  );
}
