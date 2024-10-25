'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrent } from "./api/useCurrent";
import { useLogout } from "./api/useLogout";
import { Button } from "@/components/ui/button";
import { Loader, LogOut } from "lucide-react";
import DottedDashSeparator from "@/components/DottedDashSeparator";

const UserButton = () => {
  const {data:user, isLoading} = useCurrent();
  const {mutate: logout} = useLogout();

  if(isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if(!user) {
    return null;
  }

  const {name, email} = user;
  const avatarFallback = name ? name.charAt(0).toUpperCase() : 'U';
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar className="cursor-pointer size-10 hover:opacity-80 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="cursor-pointer size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || 'User'}
            </p>
            <p className="text-xs text-neutral-500">
              {email}
            </p>
          </div>
        </div>
        <DottedDashSeparator />
        <DropdownMenuItem className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer hover:bg-amber-50" onClick={() => logout()}>
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton