import { forwardRef } from "react"
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

const Separator = forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 bg-gray-200",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
  />
));
Separator.displayName = "Separator"

Separator.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  decorative: PropTypes.bool,
};
Separator.displayName = "Separator"

export { Separator }

