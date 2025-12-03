import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-white.png";
import { House } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import { Rss } from "lucide-react";
import { MessageSquareDot } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Dot } from 'lucide-react';
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={Logo} alt="Logo" width={120} height={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <House />
                <Link to="#">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ChartBarStacked />
                <Link to="#">Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Rss />
                <Link to="#">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageSquareDot />
                <Link to="#">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <CircleUserRound />
                <Link to="#">User</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Dot />
                <Link to="#">Categories Items</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
