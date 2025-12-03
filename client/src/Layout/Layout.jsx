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
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-40px)]">
          <Outlet />
        </div>

        <Footer />
      </main>
    </SidebarProvider>
  );
}
