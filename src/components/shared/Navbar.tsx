import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import ActionButton from "./button/ActionButton";
const ResponsiveNavbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full relative dark:bg-slate-900 bg-white rounded-full ">
      {/* logo */}

      {/* nav links */}
      <ul className="items-center gap-5 text-[1rem] text-[#424242] md:flex hidden">
        <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          home
        </li>

        <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          features
        </li>

        <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          blogs
        </li>

        <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
          shop
        </li>
      </ul>

      {/* action buttons */}
      <div className="items-center gap-2.5 flex">
        <ActionButton className="">Sign in</ActionButton>
        <ActionButton variant="outline">Sign up</ActionButton>

        <IconMenu2
          stroke={2}
          className="text-[1.8rem] dark:text-[#abc2d3] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-50 opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center absolute top-16.25 dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
      >
        <ul className="items-center gap-5 text-[1rem] text-gray-600 flex flex-col">
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            home
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            features
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            blogs
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5 dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            shop
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default ResponsiveNavbar;
