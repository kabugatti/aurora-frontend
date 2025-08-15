import React from "react";
import { Link } from "react-router-dom";

const NavDesktop = () => {
  const items = [
    { key: "payments", label: "Payments", path: "/payments" },
    { key: "escrow", label: "Escrow", path: "escrow/classes" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {items.map(({ key, label, path }) => (
        <Link
          key={key}
          to={path}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavDesktop;
