import ApperIcon from "@/components/ApperIcon"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"

const Header = ({ 
  title, 
  subtitle, 
  onSearch, 
  onAddNew, 
  addNewText = "Add New",
  showSearch = false,
  showAddButton = false 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">{title}</h1>
              {subtitle && (
                <p className="text-secondary mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-6">
          {showSearch && (
            <div className="w-64">
              <SearchBar 
                onSearch={onSearch}
                placeholder="Search models..."
              />
            </div>
          )}

          {showAddButton && (
            <Button 
              onClick={onAddNew}
              className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              {addNewText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header