import { forwardRef } from "react"
import PropTypes from "prop-types"
import { cn } from "@/lib/utils"

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm", className)}
    {...props}
  />
));

Card.displayName = "Card"

Card.propTypes = {
  className: PropTypes.string,
}
const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-b border-gray-200 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

CardHeader.propTypes = {
  className: PropTypes.string,
}
CardTitle.displayName = "CardTitle"

CardTitle.propTypes = {
  className: PropTypes.string,
}
CardDescription.displayName = "CardDescription"

CardDescription.propTypes = {
  className: PropTypes.string,
}
CardContent.displayName = "CardContent"

CardContent.propTypes = {
  className: PropTypes.string,
}
CardFooter.displayName = "CardFooter"

CardFooter.propTypes = {
  className: PropTypes.string,
}
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

