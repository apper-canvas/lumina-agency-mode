import { useState } from "react"
import Header from "@/components/organisms/Header"
import ModelsGrid from "@/components/organisms/ModelsGrid"
import { useModelData } from "@/hooks/useModelData"

const ModelsPage = () => {
  const { models, loading, error, refetch, addModel } = useModelData()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModels, setFilteredModels] = useState([])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredModels([])
      return
    }
    
    const filtered = models.filter(model =>
      model.name.toLowerCase().includes(query.toLowerCase()) ||
      model.location.toLowerCase().includes(query.toLowerCase()) ||
      model.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredModels(filtered)
  }

  const handleAddNew = () => {
    // Mock add new model functionality
    const newModel = {
      Id: Date.now(),
      name: "New Model",
      age: 22,
      height: "5'9\"",
      location: "New York, NY",
      category: "Fashion",
      photos: [],
      measurements: {
        bust: "",
        waist: "",
        hips: "",
        shoe: "",
        dress: ""
      },
      contact: {
        email: "",
        phone: "",
        emergency: ""
      },
      experience: [],
      availability: [],
      createdAt: new Date().toISOString()
    }
    
    addModel(newModel)
  }

  const displayModels = searchQuery ? filteredModels : models

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Models"
        subtitle={`Manage your talent roster • ${models?.length || 0} models`}
        onSearch={handleSearch}
        onAddNew={handleAddNew}
        addNewText="Add Model"
        showSearch={true}
        showAddButton={true}
      />
      
      <div className="p-6">
        <ModelsGrid
          models={displayModels}
          loading={loading}
          error={error}
          onRetry={refetch}
          onAddNew={handleAddNew}
        />
      </div>
    </div>
  )
}

export default ModelsPage