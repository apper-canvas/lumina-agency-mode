import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import PortfolioTab from "@/components/organisms/PortfolioTab"
import DetailsTab from "@/components/organisms/DetailsTab"
import AvailabilityTab from "@/components/organisms/AvailabilityTab"
import HistoryTab from "@/components/organisms/HistoryTab"

const ModelDetail = ({ model, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState("portfolio")

  const tabs = [
    { id: "portfolio", label: "Portfolio", icon: "Camera" },
    { id: "details", label: "Details", icon: "User" },
    { id: "availability", label: "Availability", icon: "Calendar" },
    { id: "history", label: "History", icon: "Clock" }
  ]

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this model? This action cannot be undone.")) {
      onDelete(model.Id)
      toast.success("Model deleted successfully")
    }
  }

  const handleUpdate = (updates) => {
    onUpdate(model.Id, updates)
    toast.success("Model updated successfully")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "portfolio":
        return <PortfolioTab model={model} onUpdate={handleUpdate} />
      case "details":
        return <DetailsTab model={model} onUpdate={handleUpdate} />
      case "availability":
        return <AvailabilityTab model={model} onUpdate={handleUpdate} />
      case "history":
        return <HistoryTab model={model} />
      default:
        return <PortfolioTab model={model} onUpdate={handleUpdate} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src={model.photos[0]?.url || "/api/placeholder/120/120"} 
                alt={model.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-primary">{model.name}</h1>
                <Badge variant="primary">{model.category}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-secondary">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>{model.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Calendar" className="w-4 h-4" />
                  <span>{model.age} years old</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Ruler" className="w-4 h-4" />
                  <span>{model.height}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Camera" className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-secondary">
                    {model.photos?.length || 0} photos
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" className="w-4 h-4 text-warning" />
                  <span className="text-sm text-secondary">
                    {model.experience?.length || 0} projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm"
      >
        <div className="border-b border-gray-200">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-accent bg-accent/5"
                    : "text-secondary hover:text-primary hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon 
                    name={tab.icon} 
                    className={`w-4 h-4 ${
                      activeTab === tab.id ? "text-accent" : "text-secondary"
                    }`} 
                  />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent tab-indicator"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ModelDetail