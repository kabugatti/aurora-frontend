"use client";

import React from "react";
import { Link } from "react-router-dom";
import auroraLogo from "../../assets/auroraLogo.png";
import ActionButton from "../ui/buttons/ActionButton";

const navItems = [
  { label: "Skills", path: "/skills" },
  { label: "Courses", path: "/courses" },
  { label: "Vocabulary", path: "/vocabulary" },
  { label: "Business English", path: "/business-english" },
  { label: "Community", path: "/community" },
];

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-2 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={auroraLogo} alt="Aurora Logo" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1 xl:gap-8">
          {navItems.map((item) => (
            <ActionButton
              key={item.label}
              to={item.path}
              variant="nav"
              className="text-xs lg:text-sm"
            >
              {item.label}
            </ActionButton>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <ActionButton to="/login" variant="outline">
            Log In
          </ActionButton>
          <ActionButton to="/signup" variant="primary">
            Sign Up
          </ActionButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
