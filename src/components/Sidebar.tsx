import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  VerifiedIcon,
  TicketIcon,
  TicketsPlaneIcon,
  TicketSlashIcon,
  UserIcon
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Tombolas",
    url: "/tombolas",
    icon: TicketIcon,
  },
  {
    title: "Verify",
    url: "/verify",
    icon: VerifiedIcon,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: UserIcon
  }
]

export function TombolaSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold">Tombola 🎟️🎰</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
