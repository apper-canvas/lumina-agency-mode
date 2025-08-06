import { motion } from "framer-motion"
import ModelCard from "@/components/molecules/ModelCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const ModelsGrid = ({ models, loading, error, onRetry, onAddNew }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error 
        message="Failed to load models. Please try again." 
        onRetry={onRetry}
      />
    )
  }

  if (!models || models.length === 0) {
    return (
      <Empty
        icon="Users"
        title="No models found"
        description="Start building your talent roster by adding your first model to the agency."
        actionText="Add First Model"
        onAction={onAddNew}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="portfolio-grid"
    >
      {models.map((model, index) => (
        <motion.div
          key={model.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <ModelCard model={model} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ModelsGrid