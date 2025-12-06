"use client";

import {
  FileText,
  Home,
  PlusCircle,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/contracts", icon: FileText, label: "Contracts" },
  { href: "/generate", icon: PlusCircle, label: "Generate" },
  { href: "/compliance", icon: ShieldCheck, label: "Compliance" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="w-full flex flex-col gap-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/settings" passHref>
                    <SidebarMenuButton
                        isActive={pathname === "/settings"}
                        tooltip={"Settings"}
                    >
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2 items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" data-ai-hint="person face" />
                                <AvatarFallback>AP</AvatarFallback>
                            </Avatar>
                            <div className="text-left group-data-[collapsible=icon]:hidden">
                                <p className="text-sm font-medium text-sidebar-foreground">Alex Park</p>
                                <p className="text-xs text-sidebar-foreground/70">alex@acme.inc</p>
                            </div>
                        </div>
                    </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Park</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      alex@acme.inc
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <Link href="/">
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex-1">
                {/* Could add breadcrumbs or page title here */}
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
