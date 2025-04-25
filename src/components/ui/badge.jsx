import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border max-h-6 px-2.5 py-0.5 leading-[100%] text-[10px] font-semibold transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }

