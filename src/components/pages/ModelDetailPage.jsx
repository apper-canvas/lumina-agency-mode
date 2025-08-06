import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import ModelDetail from "@/components/organisms/ModelDetail"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { useModelData } from "@/hooks/useModelData"

const ModelDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { models, loading, error, updateModel, deleteModel, refetch } = useModelData()

  const model = models?.find(m => m.Id === parseInt(id))

  const handleBack = () => {
    navigate(-1)
  }

  const handleUpdate = (modelId, updates) => {
    updateModel(modelId, updates)
  }

  const handleDelete = (modelId) => {
    deleteModel(modelId)
    navigate("/models")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back to Models
            </Button>
          </div>
          <Loading variant="detail" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back to Models
            </Button>
          </div>
          <Error 
            message="Failed to load model details. Please try again." 
            onRetry={refetch}
          />
        </div>
      </div>
    )
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back to Models
            </Button>
          </div>
          <Error 
            message="Model not found. The model may have been deleted or the link is invalid." 
            onRetry={() => navigate("/models")}
          />
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-6"
        >
          <Button variant="ghost" onClick={handleBack}>
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Models
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center space-x-2 text-sm text-secondary">
            <span>Models</span>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
            <span className="text-primary font-medium">{model.name}</span>
          </div>
        </motion.div>

        <ModelDetail
          model={model}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  )
}

export default ModelDetailPage