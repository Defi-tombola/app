import Navbar from './Navbar'
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { TombolaSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
          <SidebarProvider>
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