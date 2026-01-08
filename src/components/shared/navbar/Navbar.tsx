import logo from "@/assets/common/logo.png";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import "@/components/shared/button/ActionButton.css";

const ResponsiveNavbar = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if current page is Home
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 pt-12.5 pb-7.5 w-full z-50 transition-all duration-300",
        !isHomePage || isScrolled ? "bg-background" : "bg-transparent "
      )}
    >
      <nav className="flex items-center justify-between max-w-container mx-auto px-4 lg:px-0">
        {/* logo */}
        <Link to="/" className="shrink-0">
          <img
            src={logo}
            className={cn("transition-all duration-300 w-auto h-12 md:h-16")}
            alt="logo"
          />
        </Link>

        {/* nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-base transition-all duration-300 hover:text-primary pb-1 font-medium",
                    isActive
                      ? "text-primary border-b-2 border-primary"
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

        {/* action buttons */}
        <div className="items-center gap-4 flex pr-3">
          <Button variant={"outline"}>Login</Button>
          <Button variant={"default"}>Book A Setup Call</Button>

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
