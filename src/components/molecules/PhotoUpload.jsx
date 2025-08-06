import { useState, useRef } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const PhotoUpload = ({ onUpload, category = "headshot", className }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith("image/")
    )
    
    if (files.length > 0) {
      handleUpload(files)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleUpload(files)
    }
  }

  const handleUpload = async (files) => {
    setIsUploading(true)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const uploadedPhotos = files.map(file => ({
        Id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        category,
        caption: "",
        order: 0,
        uploadedAt: new Date().toISOString()
      }))
      
      onUpload?.(uploadedPhotos)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "photo-upload-zone rounded-lg p-8 text-center transition-all duration-200",
          isDragging && "drag-over",
          isUploading && "pointer-events-none opacity-60"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon name="Upload" className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Uploading...</h3>
              <p className="text-secondary">Please wait while we process your photos</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon name="ImagePlus" className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Drag & drop photos here
              </h3>
              <p className="text-secondary mb-4">
                or click to browse your computer
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-dashed"
              >
                <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
                Choose Photos
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-secondary text-center">
        Supported formats: JPG, PNG, GIF. Max file size: 10MB per photo.
      </p>
    </div>
  )
}

export default PhotoUpload