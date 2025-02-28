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
} from "@/components/ui/sidebar"
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
      url: "#",
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
      url: "#",
      icon: ListCheck,
      items: [
        {
          title: "Funcionários",
          url: "/cotrol/employess",
        },
        {
          title: "Empréstimos",
          url: "cotrol/borrowing",
        },
      ],
    },
    {
      title: "Patrimônio",
      url: "#",
      icon: FolderOpen,
      items: [
        {
          title: "Filiais",
          url: "#",
        },
        {
          title: "Setores",
          url: "#",
        },
        {
          title: "Fornecedores",
          url: "#",
        },
      ],
    },
    {
      title: "Usuários",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Criar Usuário",
          url: "#",
        },
        {
          title: "Listar Usuários",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle></ModeToggle>
        </ThemeProvider>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}