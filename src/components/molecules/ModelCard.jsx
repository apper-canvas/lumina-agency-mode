import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const ModelCard = ({ model }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/models/${model.Id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer model-card-hover group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
        <img 
          src={model.photos[0]?.url || "/api/placeholder/300/400"} 
          alt={model.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ApperIcon name="Eye" className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-primary">
            {model.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-primary group-hover:text-accent transition-colors duration-200">
            {model.name}
          </h3>
          <p className="text-secondary text-sm">{model.location}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-secondary">
              <span className="font-medium text-primary">{model.age}</span> years
            </span>
            <span className="text-secondary">
              <span className="font-medium text-primary">{model.height}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ApperIcon name="Camera" className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium">
              {model.photos?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ModelCard