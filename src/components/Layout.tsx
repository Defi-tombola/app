import Navbar from './navbar'
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { TombolaSidebar } from "@/components/Sidebar";

export default function Layout({ children }) {
    return (
        <>
          <SidebarProvider style={{
            "--sidebar-width": "12rem",
            "--sidebar-width-mobile": "12rem",
          }}>
            <TombolaSidebar />
            <SidebarTrigger />
            <main  className="w-full p-10">
              <Navbar/>
              <div className="mt-10">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </>
    )
}