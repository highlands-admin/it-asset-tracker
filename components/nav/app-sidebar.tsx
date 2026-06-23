'use client'

import {
  RiBuilding2Line,
  RiDashboardLine,
  RiRouterLine,
  RiServerLine,
  RiStore2Line,
} from '@remixicon/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps, type ComponentType } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

type NavItem = {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: RiDashboardLine },
  { title: 'Properties', href: '/properties', icon: RiBuilding2Line },
  { title: 'Vendors', href: '/vendors', icon: RiStore2Line },
  { title: 'Network', href: '/network', icon: RiRouterLine },
]

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/"
          onClick={() => {
            if (isMobile) setOpenMobile(false)
          }}
          className="font-heading flex items-center gap-2 px-2 py-1.5 text-base font-semibold"
        >
          <RiServerLine className="size-5 text-primary" aria-hidden />
          IT Asset Tracker
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <NavMenuItem key={item.href} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function NavMenuItem({
  item,
  pathname,
}: {
  item: NavItem
  pathname: string
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const Icon = item.icon
  // Exact match on the dashboard root avoids highlighting it on every route.
  const isActive =
    pathname === item.href ||
    (item.href !== '/' && pathname.startsWith(`${item.href}/`))
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <Link
            href={item.href}
            onClick={() => {
              // On mobile the sidebar is an overlay sheet; close it on navigation.
              if (isMobile) setOpenMobile(false)
            }}
          />
        }
      >
        <Icon className="size-4" />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
