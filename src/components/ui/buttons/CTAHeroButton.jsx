import React from "react";

const baseStyles =
  "inline-flex items-center justify-center px-6 py-2 rounded-[6px] font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none shadow-sm";

const variants = {
  primary:
    "bg-emerald-400 hover:bg-emerald-300 text-[#111827] border-none focus:ring-[#34D399]",
  outline:
    "text-[#22D3EE] border border-cyan-400 text-cyan-400 hover:bg-[#e0f7fa] focus:ring-[#22D3EE]",
};

export default function CTAHeroButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const style = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;
  return (
    <button type={type} className={style} {...props}>
      {children}
    </button>
  );
} 