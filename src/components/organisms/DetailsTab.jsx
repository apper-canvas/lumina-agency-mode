import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const DetailsTab = ({ model, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: model.name || "",
    age: model.age || "",
    height: model.height || "",
    location: model.location || "",
    category: model.category || "",
    measurements: model.measurements || {
      bust: "",
      waist: "", 
      hips: "",
      shoe: "",
      dress: ""
    },
    contact: model.contact || {
      email: "",
      phone: "",
      emergency: ""
    }
  })

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: model.name || "",
      age: model.age || "",
      height: model.height || "",
      location: model.location || "",
      category: model.category || "",
      measurements: model.measurements || {
        bust: "",
        waist: "", 
        hips: "",
        shoe: "",
        dress: ""
      },
      contact: model.contact || {
        email: "",
        phone: "",
        emergency: ""
      }
    })
    setIsEditing(false)
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (isEditing) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Edit Model Details</h2>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <ApperIcon name="Save" className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              required
            />
            <FormField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData("age", parseInt(e.target.value))}
              required
            />
<FormField
              label="Height"
              value={formData.height}
              onChange={(e) => updateFormData("height", e.target.value)}
              placeholder="e.g., 5'8&quot;"
              required
            />
            <FormField
              label="Location"
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              required
            />
            <FormField
              label="Category"
              value={formData.category}
              onChange={(e) => updateFormData("category", e.target.value)}
              required
            >
              <select 
                value={formData.category}
                onChange={(e) => updateFormData("category", e.target.value)}
                className="flex w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Commercial">Commercial</option>
                <option value="Fitness">Fitness</option>
                <option value="Editorial">Editorial</option>
                <option value="Plus Size">Plus Size</option>
                <option value="Petite">Petite</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-4">Measurements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<FormField
              label="Bust"
              value={formData.measurements.bust}
              onChange={(e) => updateNestedData("measurements", "bust", e.target.value)}
              placeholder="e.g., 34&quot;"
            />
            <FormField
              label="Waist"
              value={formData.measurements.waist}
              onChange={(e) => updateNestedData("measurements", "waist", e.target.value)}
              placeholder="e.g., 24\""
            />
            <FormField
              label="Hips"
              value={formData.measurements.hips}
              onChange={(e) => updateNestedData("measurements", "hips", e.target.value)}
              placeholder="e.g., 36\""
            />
            <FormField
              label="Shoe Size"
              value={formData.measurements.shoe}
              onChange={(e) => updateNestedData("measurements", "shoe", e.target.value)}
              placeholder="e.g., 8.5"
            />
            <FormField
              label="Dress Size"
              value={formData.measurements.dress}
              onChange={(e) => updateNestedData("measurements", "dress", e.target.value)}
              placeholder="e.g., 6"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Email"
              type="email"
              value={formData.contact.email}
              onChange={(e) => updateNestedData("contact", "email", e.target.value)}
            />
            <FormField
              label="Phone"
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => updateNestedData("contact", "phone", e.target.value)}
            />
            <div className="md:col-span-2">
              <FormField
                label="Emergency Contact"
                value={formData.contact.emergency}
                onChange={(e) => updateNestedData("contact", "emergency", e.target.value)}
                placeholder="Emergency contact name and phone"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Model Details</h2>
        <Button onClick={() => setIsEditing(true)}>
          <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
      </div>

      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
          <ApperIcon name="User" className="w-5 h-5 mr-2" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
            <p className="text-primary font-medium">{model.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Category</label>
            <Badge variant="primary">{model.category}</Badge>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Age</label>
            <p className="text-primary">{model.age} years old</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Height</label>
            <p className="text-primary">{model.height}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Location</label>
            <p className="text-primary flex items-center">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              {model.location}
            </p>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
          <ApperIcon name="Ruler" className="w-5 h-5 mr-2" />
          Measurements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Bust</label>
            <p className="text-primary font-medium">{model.measurements?.bust || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Waist</label>
            <p className="text-primary font-medium">{model.measurements?.waist || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Hips</label>
            <p className="text-primary font-medium">{model.measurements?.hips || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Shoe</label>
            <p className="text-primary font-medium">{model.measurements?.shoe || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Dress</label>
            <p className="text-primary font-medium">{model.measurements?.dress || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
          <ApperIcon name="Phone" className="w-5 h-5 mr-2" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Email</label>
            <p className="text-primary">{model.contact?.email || "Not provided"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Phone</label>
            <p className="text-primary">{model.contact?.phone || "Not provided"}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">Emergency Contact</label>
            <p className="text-primary">{model.contact?.emergency || "Not provided"}</p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
          <ApperIcon name="Star" className="w-5 h-5 mr-2" />
          Experience
        </h3>
        {model.experience && model.experience.length > 0 ? (
          <div className="space-y-4">
            {model.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-accent pl-4">
                <h4 className="font-medium text-primary">{exp.project}</h4>
                <p className="text-secondary text-sm">{exp.client} • {exp.year}</p>
                {exp.description && (
                  <p className="text-secondary text-sm mt-1">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary">No experience recorded yet.</p>
        )}
      </div>
    </div>
  )
}

export default DetailsTab