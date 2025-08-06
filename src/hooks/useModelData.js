import { useState, useEffect } from "react"
import { getModels, createModel, updateModel as updateModelService, deleteModel as deleteModelService } from "@/services/api/modelService"

export const useModelData = () => {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadModels = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getModels()
      setModels(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addModel = async (modelData) => {
    try {
      const newModel = await createModel(modelData)
      setModels(prev => [newModel, ...prev])
      return newModel
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateModel = async (id, updates) => {
    try {
      const updatedModel = await updateModelService(id, updates)
      setModels(prev => prev.map(model => 
        model.Id === id ? updatedModel : model
      ))
      return updatedModel
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteModel = async (id) => {
    try {
      await deleteModelService(id)
      setModels(prev => prev.filter(model => model.Id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refetch = () => {
    loadModels()
  }

  useEffect(() => {
    loadModels()
  }, [])

  return {
    models,
    loading,
    error,
    addModel,
    updateModel,
    deleteModel,
    refetch
  }
}