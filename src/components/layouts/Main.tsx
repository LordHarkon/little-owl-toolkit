import clsx from "clsx";
import React from "react";
import { FaToolbox } from "react-icons/fa";
import { HiMenu, HiMenuAlt1, HiSun } from "react-icons/hi";
import { RxMoon } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useTheme } from "~/context/ThemeContext";

type MenuButtonProps = {
  children: React.ReactNode;
  href: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuButton = (props: MenuButtonProps) => {
  return (
    <NavLink
      to={props.href}
      className={({ isActive }) =>
        clsx("rounded border border-transparent px-2 py-1 text-sm", {
          "bg-zinc-300 dark:bg-zinc-700": isActive,
          "hover:bg-zinc-200 hover:dark:bg-zinc-800": !isActive,
        })
      }
      onClick={() => props.setIsOpen(false)}
    >
      {props.children}
    </NavLink>
  );
};

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-zinc-950 text-black transition-all duration-500 ease-in-out dark:text-white">
      {/* Header */}
      <div className="flex h-16 w-full flex-row items-center justify-between border-b border-black/20 bg-white dark:border-white/10 dark:bg-zinc-900">
        {/* Title */}
        <div className="mx-4 flex items-center">
          <HiMenu
            className={clsx("h-8 w-8 cursor-pointer text-zinc-200 sm:hidden", {
              hidden: isNavbarOpen,
            })}
            onClick={() => setIsNavbarOpen(true)}
          />
          <HiMenuAlt1
            className={clsx("h-8 w-8 cursor-pointer text-zinc-200 sm:hidden", {
              hidden: !isNavbarOpen,
            })}
            onClick={() => setIsNavbarOpen(false)}
          />
          <FaToolbox className="h-8 w-8 max-sm:hidden" />
          <span className="ml-2 font-semibold">Little Owl's Toolkit</span>
        </div>
        {/* Theme */}
        <button className="mx-4 rounded border border-black/20 bg-zinc-200 p-1 dark:bg-zinc-800" onClick={toggleTheme}>
          <HiSun
            className={clsx("h-6 w-6", {
              hidden: isDarkTheme,
            })}
          />
          <RxMoon
            className={clsx("h-6 w-6", {
              hidden: !isDarkTheme,
            })}
          />
        </button>
      </div>
      <div className="flex h-full flex-row">
        {/* Navbar */}
        <div
          className={clsx(
            "flex min-h-[calc(100vh-64px)] w-48 flex-col space-y-2 border-r border-black/20 bg-white p-2 transition-transform duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-900 max-sm:absolute",
            {
              "max-sm:-translate-x-48": !isNavbarOpen,
            },
          )}
        >
          <MenuButton href="/" setIsOpen={setIsNavbarOpen}>
            Home
          </MenuButton>
          <MenuButton href="/settings" setIsOpen={setIsNavbarOpen}>
            Settings
          </MenuButton>
          <MenuButton href="/test" setIsOpen={setIsNavbarOpen}>
            Test
          </MenuButton>
        </div>
        {/* Content */}
        <div className="flex min-h-[calc(100vh-64px)] w-full bg-zinc-200 p-4 dark:bg-zinc-950">{props.children}</div>
      </div>
    </div>
  );
};

export default Main;
