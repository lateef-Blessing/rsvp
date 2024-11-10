import {
  LucideIcon,
  Settings,
  CalendarDays,
  CopyPlus,
  CalendarCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const getMenuList = (pathname: string): Group[] => {
  const role = useCurrentRole();
  if (role == UserRole.ADMIN) {
    return [
      {
        groupLabel: "Admin",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname.includes("/dashboard"),
            icon: LayoutDashboard,
            submenus: [],
          },
          {
            href: "/users",
            label: "Users",
            active: pathname.includes("/users"),
            icon: Users,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Events",
        menus: [
          {
            href: "/organized",
            label: "Events Organized",
            active: pathname.includes("/organized"),
            icon: CalendarCheck,
            submenus: [],
          },
          {
            href: "/events",
            label: "All Events",
            active: pathname.includes("/events"),
            icon: CalendarDays,
            submenus: [],
          },
          {
            href: "/create",
            label: "Create Event",
            active: pathname.includes("/create"),
            icon: CopyPlus,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: [],
          },
        ],
      },
    ];
  } else {
    return [
      {
        groupLabel: "Events",
        menus: [
          {
            href: "/organized",
            label: "Events Organized",
            active: pathname.includes("/organized"),
            icon: CalendarCheck,
            submenus: [],
          },
          {
            href: "/events",
            label: "All Events",
            active: pathname.includes("/events"),
            icon: CalendarDays,
            submenus: [],
          },
          {
            href: "/create",
            label: "Create Event",
            active: pathname.includes("/create"),
            icon: CopyPlus,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: [],
          },
        ],
      },
    ];
  }
};
