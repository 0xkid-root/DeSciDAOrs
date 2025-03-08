"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AtomIcon, Menu, User, Bell, Moon, Sun } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@/hooks/use-media-query";

const routes = [
  { name: "Home", path: "/", description: "Main dashboard" },
  { name: "Proposals", path: "/proposals", description: "View and submit proposals" },
  { name: "Voting", path: "/voting", description: "Participate in governance" },
  { name: "About", path: "/about", description: "Learn about DeSciDAOrs" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [notifications, setNotifications] = React.useState(2);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Debounced scroll handler
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 50); // Debounce by 50ms
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Simulated wallet connection
  const handleLogin = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsConnecting(false);
      setNotifications(3); // Simulate new notification on login
    }, 1000); // Simulated delay
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Simulated notification update
  React.useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        setNotifications((prev) => (prev > 0 ? prev - 1 : 0));
      }, 5000); // Clear notifications over time
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center space-x-2" aria-label="DeSciDAOrs Home">
            <AtomIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl">DeSciDAOrs</span>
          </Link>
          <nav className="hidden md:flex" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) => (
                  <NavigationMenuItem key={route.path}>
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === route.path && "bg-accent text-accent-foreground"
                      )}
                    >
                      {route.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink asChild>
                        <Link
                          href={route.path}
                          className="flex w-full items-center p-4 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{route.name}</span>
                            <span className="text-sm text-muted-foreground">{route.description}</span>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="transition-transform hover:scale-110"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hidden sm:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative transition-transform hover:scale-110"
                  aria-label={`Notifications (${notifications} unread)`}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center animate-pulse">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full transition-transform hover:scale-110"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { path: "/dashboard", label: "Dashboard" },
                    { path: "/proposals/create", label: "Create Proposal" },
                    { path: "/voting", label: "Vote" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link href={item.path} className="hover:bg-accent/50">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="hover:bg-destructive/10"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleLogin}
                disabled={isConnecting}
                className="transition-transform hover:scale-105"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
              <Button
                onClick={handleLogin}
                disabled={isConnecting}
                className="transition-transform hover:scale-105"
              >
                Join DAO
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden transition-transform hover:scale-110"
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>DeSci Learning DAO</SheetTitle>
                <SheetDescription>
                  Join the future of decentralized education and research
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "px-4 py-2 rounded-md hover:bg-accent transition-colors",
                      pathname === route.path && "bg-accent text-accent-foreground"
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{route.name}</span>
                      <span className="text-sm text-muted-foreground">{route.description}</span>
                    </div>
                  </Link>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      className="mt-4 transition-transform hover:scale-105"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="mt-4 transition-transform hover:scale-105"
                      onClick={handleLogin}
                      disabled={isConnecting}
                    >
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                    <Button
                      className="mt-2 transition-transform hover:scale-105"
                      onClick={handleLogin}
                      disabled={isConnecting}
                    >
                      Join DAO
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}