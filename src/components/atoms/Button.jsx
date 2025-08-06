import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-accent text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "bg-white text-primary border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md",
    outline: "border border-accent text-accent hover:bg-accent hover:text-white",
    ghost: "text-secondary hover:text-primary hover:bg-gray-100",
    danger: "bg-error text-white hover:bg-red-600 shadow-sm hover:shadow-md"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button