import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item.",
  actionText = "Add New",
  onAction,
  icon = "Plus",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-accent" />
      </div>
      
      <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-secondary mb-8 max-w-md leading-relaxed">{description}</p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name={icon} className="w-5 h-5 mr-2" />
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty