import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import PhotoUpload from "@/components/molecules/PhotoUpload"

const PortfolioTab = ({ model, onUpdate }) => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showUpload, setShowUpload] = useState(false)

  const categories = [
    { id: "all", label: "All Photos", count: model.photos?.length || 0 },
    { id: "headshot", label: "Headshots", count: model.photos?.filter(p => p.category === "headshot").length || 0 },
    { id: "full-body", label: "Full Body", count: model.photos?.filter(p => p.category === "full-body").length || 0 },
    { id: "commercial", label: "Commercial", count: model.photos?.filter(p => p.category === "commercial").length || 0 },
    { id: "fashion", label: "Fashion", count: model.photos?.filter(p => p.category === "fashion").length || 0 }
  ]

  const filteredPhotos = activeCategory === "all" 
    ? model.photos || []
    : (model.photos || []).filter(photo => photo.category === activeCategory)

  const handlePhotoUpload = (newPhotos) => {
    const updatedPhotos = [...(model.photos || []), ...newPhotos]
    onUpdate({ photos: updatedPhotos })
    setShowUpload(false)
    toast.success(`${newPhotos.length} photo(s) uploaded successfully`)
  }

  const handleDeletePhoto = (photoId) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      const updatedPhotos = model.photos.filter(photo => photo.Id !== photoId)
      onUpdate({ photos: updatedPhotos })
      toast.success("Photo deleted successfully")
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-accent text-white shadow-sm"
                  : "bg-gray-100 text-secondary hover:bg-gray-200"
              }`}
            >
              <span>{category.label}</span>
              <Badge 
                variant={activeCategory === category.id ? "default" : "default"}
                className={activeCategory === category.id ? "bg-white/20 text-white" : ""}
              >
                {category.count}
              </Badge>
            </button>
          ))}
        </div>

        <Button 
          onClick={() => setShowUpload(!showUpload)}
          className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Photos
        </Button>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">Upload New Photos</h3>
            <Button 
              variant="ghost" 
              onClick={() => setShowUpload(false)}
              className="text-secondary hover:text-primary"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-2">
              Category for new photos:
            </label>
            <select 
              className="w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              defaultValue={activeCategory === "all" ? "headshot" : activeCategory}
            >
              <option value="headshot">Headshots</option>
              <option value="full-body">Full Body</option>
              <option value="commercial">Commercial</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          
          <PhotoUpload 
            onUpload={handlePhotoUpload}
            category={activeCategory === "all" ? "headshot" : activeCategory}
          />
        </motion.div>
      )}

      {/* Photos Grid */}
      {filteredPhotos.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.Id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.caption || `${model.name} - ${photo.category}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-primary">
                    {photo.category}
                  </Badge>
                </div>
                
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <button
                    onClick={() => handleDeletePhoto(photo.Id)}
                    className="w-8 h-8 bg-error/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-error transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Camera" className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            {activeCategory === "all" ? "No photos yet" : `No ${activeCategory} photos`}
          </h3>
          <p className="text-secondary mb-6">
            {activeCategory === "all" 
              ? "Start building this model's portfolio by uploading their first photos."
              : `Add some ${activeCategory} photos to showcase this category.`}
          </p>
          <Button 
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent"
          >
            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      )}
    </div>
  )
}

export default PortfolioTab