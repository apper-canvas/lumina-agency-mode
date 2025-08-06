import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({
  className,
  type = "text",
  error,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-error focus:border-error focus:ring-error/20",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input