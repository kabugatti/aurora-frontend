import { forwardRef } from "react"
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

const Avatar = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))

Avatar.displayName = "Avatar"

Avatar.propTypes = {
  className: PropTypes.string,
};
AvatarImage.displayName = "AvatarImage"

AvatarImage.propTypes = {
  className: PropTypes.string,
};

const AvatarImage = forwardRef(({ className, ...props }, ref) => (
  <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
))
AvatarFallback.displayName = "AvatarFallback"

AvatarFallback.propTypes = {
  className: PropTypes.string,
};

const AvatarFallback = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-950", className)}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

