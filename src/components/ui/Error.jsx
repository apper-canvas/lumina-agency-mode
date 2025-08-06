import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-primary mb-2">Oops! Something went wrong</h3>
      <p className="text-secondary mb-6 max-w-sm">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent">
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error