"use client";

import { useState, memo } from "react";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 bg-[#F7F8FA] overflow-auto flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

/** Sidebar con su propio estado (no afecta al layout ni a los children) */
function SidebarBase() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  return (
    <div
      className={`${
        isExpanded
          ? "w-[16%] md:w-[8%] lg:w-[16%] xl:w-[14%]"
          : "w-[6%] shadow-md z-50"
      } transition-all duration-300 p-4 flex flex-col bg-[#244c70] text-gray-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={50} height={32} />
          {isExpanded && (
            <span className="hidden lg:block font-bold">LINGUAPP</span>
          )}
        </Link>

        {/* Botón toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-gray-700 bg-gray-300 rounded-full p-2 focus:outline-none"
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
        </button>
      </div>

      {/* Menú */}
      <Menu isExpanded={isExpanded} />
    </div>
  );
}

/** Memo para evitar renders extra si los props no cambian */
const Sidebar = memo(SidebarBase);
