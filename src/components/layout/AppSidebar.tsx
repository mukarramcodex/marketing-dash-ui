"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LineChart,
  Star,
  FileText,
  Users,
  Landmark,
  Package,
  Gift,
  Link2,
  Youtube,
  SettingsIcon,
  ChevronDown,
  ChevronRight,
  Rocket,
  CreditCard,
  ShoppingBag,
  FilePlus2,
  ListOrdered,
  Banknote
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { Button } from "../ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";

const NavLink = ({ href, icon: Icon, label, exact = false, children, isSubItem = false, defaultOpen = false }: {
  href?: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
  children?: React.ReactNode;
  isSubItem?: boolean;
  defaultOpen?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = href ? (exact ? pathname === href : pathname.startsWith(href)) : false;
  const { state: sidebarState } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(defaultOpen && !!children);

  const commonButtonProps = {
    isActive,
    className: cn(isSubItem ? "pl-8" : "", "w-full justify-start"),
    tooltip: label,
  };

  const content = (
    <>
      <Icon className={cn("h-5 w-5", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground")} />
      <span className={cn(sidebarState === "collapsed" && !isSubItem ? "opacity-0 w-0" : "opacity-100 w-auto", "transition-opacity duration-200 delay-100")}>{label}</span>
      {children && sidebarState !== "collapsed" && (isOpen ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />)}
    </>
  );

  if (href && !children) {
    return (
       <SidebarMenuItem>
        <Link href={href} passHref legacyBehavior>
          <SidebarMenuButton {...commonButtonProps} asChild={false}>
            {content}
          </SidebarMenuButton>
        </Link>
       </SidebarMenuItem>
    );
  }
  
  if (children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton {...commonButtonProps} onClick={() => setIsOpen(!isOpen)} asChild={false}>
           {content}
        </SidebarMenuButton>
        {isOpen && sidebarState !== "collapsed" && <SidebarMenuSub>{children}</SidebarMenuSub>}
      </SidebarMenuItem>
    );
  }

  return null;
};


export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Logo className="data-[state=collapsed]:[&>span]:hidden" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <NavLink href="/dashboard" icon={Home} label="Dashboard" exact />
          <NavLink href="/earnings" icon={Banknote} label="Earnings" />
          <NavLink href="/bestsellers" icon={Star} label="Best Sellers" />
          <NavLink href="/invoices" icon={FileText} label="My Invoices" />
          <NavLink href="/affiliates" icon={Users} label="Affiliates" />
          <NavLink label="Bank Details" icon={Landmark} defaultOpen={pathname.startsWith("/bank")}>
            <NavLink href="/bank/new" icon={FilePlus2} label="New Bank Details" isSubItem />
            <NavLink href="/bank/details" icon={CreditCard} label="My Bank Details" isSubItem />
          </NavLink>
          <NavLink label="Products" icon={Package} defaultOpen={pathname.startsWith("/products")}>
            <NavLink href="/products/all" icon={ListOrdered} label="All Products" isSubItem />
            <NavLink href="/products/my" icon={ShoppingBag} label="My Products" isSubItem />
          </NavLink>
          <NavLink href="/bonuses" icon={Gift} label="Bonuses" />
          <NavLink href="/my-link" icon={Link2} label="My Affiliate Link" />
          <NavLink href="/training" icon={Youtube} label="Training Videos" />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
         <SidebarMenu>
            <NavLink href="/settings" icon={SettingsIcon} label="Settings" />
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
