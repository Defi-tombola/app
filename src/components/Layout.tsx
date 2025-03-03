import Navbar from './Navbar'
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { TombolaSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
          <SidebarProvider>
            <TombolaSidebar />
            <main className="w-full">
              <SidebarTrigger />
              <div className="mt-4 px-5 md:px-6">
                <Navbar/>
              </div>
              <div className="mt-10 px-5 md:px-6">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </>
    )
}