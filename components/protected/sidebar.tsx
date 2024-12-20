'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/protected/menu'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { SidebarToggle } from '@/components/protected/sidebar-toggle'

export const Sidebar = () => {
  const sidebar = useSidebarToggle((state) => state.isOpen)
  const openSidebar = useSidebarToggle((state) => state.openSidebar)
  const closeSidebar = useSidebarToggle((state) => state.closeSidebar)

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !sidebar ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle
        isOpen={sidebar}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
      />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            !sidebar ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center">
            <img
              src="/bl-nobg.png"
              alt="logo"
              className={cn(
                'w-44 h-44',
                !sidebar
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            />
            <img
              src="/ba-nobg.png"
              alt="logo"
              className={cn(
                'w-10 h-10',
                !sidebar
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-96 opacity-0 hidden'
              )}
            />
          </Link>
        </Button>
        <Menu isOpen={sidebar} />
      </div>
    </aside>
  )
}
