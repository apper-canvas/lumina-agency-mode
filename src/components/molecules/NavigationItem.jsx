import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const NavigationItem = ({ icon, label, path, available = true, count }) => {
  if (!available) {
    return (
      <div className="flex items-center px-3 py-2.5 text-secondary/50 cursor-not-allowed">
        <ApperIcon name={icon} className="w-5 h-5 mr-3" />
        <span className="font-medium">{label}</span>
        <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
          Soon
        </span>
      </div>
    )
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2.5 text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group",
          isActive && "text-accent bg-accent/5 border-r-2 border-accent"
        )
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            className={cn(
              "w-5 h-5 mr-3 transition-colors duration-200",
              isActive ? "text-accent" : "text-secondary group-hover:text-primary"
            )} 
          />
          <span className="font-medium">{label}</span>
          {count !== undefined && (
            <span className={cn(
              "ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-200",
              isActive 
                ? "bg-accent/10 text-accent" 
                : "bg-gray-100 text-secondary group-hover:bg-gray-200"
            )}>
              {count}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavigationItem