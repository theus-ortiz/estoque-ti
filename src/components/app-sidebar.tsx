"use client"

import {
  ClipboardList,
  FolderOpen,
  ListCheck,
  Package,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ModeToggle } from "./mode-toggle"
import { ThemeProvider } from "./theme-provider"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Estoque TI",
      logo: ClipboardList,
      plan: "Sistema de Estoque",
      url: "/",
    },
  ],
  navMain: [
    {
      title: "Estoque",
      url: "/stock/product",
      icon: Package,
      items: [
        {
          title: "Produtos",
          url: "/stock/product",
        },
        {
          title: "Tipos",
          url: "/stock/type",
        },
        {
          title: "Marcas",
          url: "/stock/brand",
        },
        {
          title: "Unidades",
          url: "/stock/unit",
        },
      ],
    },
    {
      title: "Controle",
      url: "/control/employees",
      icon: ListCheck,
      items: [
        {
          title: "Funcionários",
          url: "/control/employees",
        },
        {
          title: "Empréstimos",
          url: "control/loans",
        },
      ],
    },
    {
      title: "Patrimônio",
      url: "/property/branch",
      icon: FolderOpen,
      items: [
        {
          title: "Filiais",
          url: "/property/branch",
        },
        {
          title: "Setores",
          url: "/property/department",
        },
        {
          title: "Fornecedores",
          url: "/property/suppliers",
        },
      ],
    },
    {
      title: "Usuários",
      url: "/users/list",
      icon: Users,
      items: [
        {
          title: "Listar Usuário",
          url: "/users/listUser",
        },
        {
          title: "Criar Usuários",
          url: "/users/creatUser",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <ModeToggle />
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarTrigger size="sm" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expandir/Recolher Sidebar</p>
                </TooltipContent>
              </Tooltip>
          </TooltipProvider>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ThemeProvider>
  )
}