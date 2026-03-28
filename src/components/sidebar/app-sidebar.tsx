"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DirectMessageList from "../chat/DirectMessageList";
import { Switch } from "../ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authSelector, themeSelector } from "@/lib/selector";
import { setTheme } from "@/lib/features/themeSlice";
import AddFriendModel from "../chat/AddFriendModel";
import CreateConvoCard from "../createNewConvo/CreateConvoCard";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector(authSelector);
  const { theme } = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const themeHandle = () => {
    dispatch(setTheme(theme == "dark" ? "light" : "dark"));
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="m-3 flex w-full items-center justify-between">
                  <h1 className="text-xl font-bold text-white">BMessage</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={theme == "dark"}
                      onCheckedChange={themeHandle}
                    />
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Content */}
        <SidebarGroup>
          <SidebarGroupAction asChild>
            <CreateConvoCard />
          </SidebarGroupAction>
        </SidebarGroup>
        {/* friend */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">bạn bè</SidebarGroupLabel>

          <SidebarGroupAction>
            <AddFriendModel />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
