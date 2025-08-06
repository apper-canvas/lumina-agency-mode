import modelData from "@/services/mockData/models.json"

let models = [...modelData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getModels = async () => {
  await delay(300)
  return [...models]
}

export const getModelById = async (id) => {
  await delay(200)
  const model = models.find(m => m.Id === parseInt(id))
  if (!model) {
    throw new Error("Model not found")
  }
  return { ...model }
}

export const createModel = async (modelData) => {
  await delay(400)
  
  const maxId = models.length > 0 ? Math.max(...models.map(m => m.Id)) : 0
  const newModel = {
    ...modelData,
    Id: maxId + 1,
    createdAt: new Date().toISOString()
  }
  
  models.unshift(newModel)
  return { ...newModel }
}

export const updateModel = async (id, updates) => {
  await delay(300)
  
  const index = models.findIndex(m => m.Id === parseInt(id))
  if (index === -1) {
    throw new Error("Model not found")
  }
  
  const updatedModel = {
    ...models[index],
    ...updates,
    Id: parseInt(id)
  }
  
  models[index] = updatedModel
  return { ...updatedModel }
}

export const deleteModel = async (id) => {
  await delay(250)
  
  const index = models.findIndex(m => m.Id === parseInt(id))
  if (index === -1) {
    throw new Error("Model not found")
  }
  
  models.splice(index, 1)
  return true
}