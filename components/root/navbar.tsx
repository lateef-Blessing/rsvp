"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PanelLeft } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#about",
    label: "About Us",
  },
  {
    href: "#workflow",
    label: "Workflow",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#faqs",
    label: "FAQs",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sticky, setSticky] = useState(false);

  // Sticky Navbar
  const navbarStickyHandler = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarStickyHandler);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white dark:bg-background",
        sticky
          ? "fixed z-[999] backdrop-blur-[5px] border-b-[1px] dark:border-b-slate-700"
          : "absolute"
      )}
    >
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-16 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="font-bold flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <img src="/bl-nobg.png" alt="logo" className="w-44 h-44" />
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden items-center">
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <PanelLeft
                  className="flex md:hidden h-7 w-7"
                  onClick={() => setIsOpen(true)}
                />
                <span className="sr-only">Menu Icon</span>
              </SheetTrigger>

              <SheetContent side="left" aria-describedby="menu items">
                <SheetHeader className="pt-4">
                  <SheetTitle className="font-bold text-xl w-full flex items-center justify-center gap-2">
                    <img src="/bl-nobg.png" alt="logo" className="w-44 h-44" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    rel="noreferrer noopener"
                    href="/auth/login"
                    className="w-[110px] border-2 bg-transparent hover:bg-primary transition-all"
                  >
                    Sign in
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>


          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              rel="noreferrer noopener"
              href="/auth/login"
              className="py-2 px-4 rounded-lg border-2 border-bgPrimary bg-transparent hover:bg-primary transition-all"
            >
              Sign in
            </Link>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
