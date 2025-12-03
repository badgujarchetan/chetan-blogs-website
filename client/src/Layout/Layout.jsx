import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/Appsidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
export default function Layout() {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
}
