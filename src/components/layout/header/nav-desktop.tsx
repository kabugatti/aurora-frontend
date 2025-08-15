import React, { useState, useRef } from "react";

type NavDesktopProps = {
  onNavClick: (key: string) => void;
};

const practiceOptions = [
  { label: "Sentence Builder", path: "/practice/sentence-builder" },
  { label: "Idiom Challenge", path: "/practice/idiom-challenge" },
  //   { label: "Drag and Drop", path: "/practice/drag-drop-sentence-builder" },
  { label: "Multiple Choice", path: "/practice/quiz" },
  { label: "Fill in the Blanks", path: "/practice/fill-in-the-blanks" },
];

const NavDesktop = ({ onNavClick }: NavDesktopProps) => {
  const items = [
    "payments",
  ];

  const displayMap = {
    payments: "Payments",
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onNavClick(item)}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          {displayMap[item]}
        </button>
      ))}
    </nav>
  );
};

export default NavDesktop;
