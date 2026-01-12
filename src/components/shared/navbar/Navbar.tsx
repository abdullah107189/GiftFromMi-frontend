import logo from "@/assets/common/logo.png";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "@/components/shared/button/ActionButton.css";

const ResponsiveNavbar = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  const isShopActive = pathname.startsWith("/shop-gifts");
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 pt-5 md:pt-12.5 pb-3 md:pb-7.5 w-full z-50 transition-all duration-300",
        !isHomePage || isScrolled ? "bg-background" : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-container mx-auto px-4 lg:px-0">
        <Link to="/" className="shrink-0 relative z-60">
          <img
            src={logo}
            className={cn("transition-all duration-300 w-auto h-12 md:h-16")}
            alt="logo"
          />
        </Link>
        {/* desktop */}
        <ul className="hidden xl:flex items-center md:gap-4 lg:gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-base transition-all duration-300 hover:text-primary pb-1 font-medium",
                    isActive
                      ? "text-primary border-b-2 border-primary" // Active Style
                      : !isHomePage || isScrolled
                      ? "text-gray-800"
                      : "text-gray-700"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* action buttons & Mobile Toggle */}
        <div className="items-center gap-4 flex pr-3 relative z-60">
          <div className="hidden sm:flex items-center gap-4">
            <Button variant={"outline"}>Login</Button>
            <Button variant={"default"}>Book A Setup Call</Button>
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M5.2002 24.7001C5.2002 25.3897 5.47412 26.051 5.96172 26.5386C6.44931 27.0262 7.11063 27.3001 7.8002 27.3001C8.48976 27.3001 9.15108 27.0262 9.63867 26.5386C10.1263 26.051 10.4002 25.3897 10.4002 24.7001C10.4002 24.0105 10.1263 23.3492 9.63867 22.8616C9.15108 22.374 8.48976 22.1001 7.8002 22.1001C7.11063 22.1001 6.44931 22.374 5.96172 22.8616C5.47412 23.3492 5.2002 24.0105 5.2002 24.7001Z"
                stroke="#101828"
                strokeWidth="1.95"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 24.7001C19.5 25.3897 19.7739 26.051 20.2615 26.5386C20.7491 27.0262 21.4104 27.3001 22.1 27.3001C22.7896 27.3001 23.4509 27.0262 23.9385 26.5386C24.4261 26.051 24.7 25.3897 24.7 24.7001C24.7 24.0105 24.4261 23.3492 23.9385 22.8616C23.4509 22.374 22.7896 22.1001 22.1 22.1001C21.4104 22.1001 20.7491 22.374 20.2615 22.8616C19.7739 23.3492 19.5 24.0105 19.5 24.7001Z"
                stroke="#101828"
                strokeWidth="1.95"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.1002 22.0999H7.8002V3.8999H5.2002"
                stroke="#101828"
                strokeWidth="1.95"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.7998 6.5L25.9998 7.8L24.6998 16.9H7.7998"
                stroke="#101828"
                strokeWidth="1.95"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute -top-1 -right-1 bg-destructive border border-white px-1 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full">
              2
            </div>
          </div>

          <button
            className="xl:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background z-50 xl:hidden flex flex-col pt-32 px-6 transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="flex flex-col md:gap-6 gap-4 mt-8">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-xl font-medium transition-all duration-300",
                    isActive ? "text-primary font-bold" : "text-gray-800"
                  )}
                >
                  <li>{item.label}</li>
                </Link>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-col gap-4">
            <Button variant={"outline"} className="w-full h-12">
              Login
            </Button>
            <Button variant={"default"} className="w-full h-12">
              Book A Setup Call
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Shop Gifts", path: "/shop-gifts" },
  { label: "For Professionals", path: "/for-professionals" },
  { label: "Bulk Automation", path: "/bulk-automation" },
  { label: "Contact Us", path: "/contact-us" },
];

export default ResponsiveNavbar;
