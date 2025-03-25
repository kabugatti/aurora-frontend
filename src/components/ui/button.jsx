import { forwardRef } from "react"
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 hover:bg-gray-100 hover:text-black",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    ghost: "hover:bg-gray-100 hover:text-black",
    link: "text-blue-600 hover:underline",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md text-sm",
    lg: "h-11 px-8 rounded-md",
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} ref={ref} {...props}>
      {children}
    </button>
  )
})

Button.displayName = "Button"
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg']),
  children: PropTypes.node,
};

export { Button }
