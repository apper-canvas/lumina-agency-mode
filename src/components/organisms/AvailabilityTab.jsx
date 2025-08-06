import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const AvailabilityTab = ({ model, onUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - currentDay)
    
    const week = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      week.push(date)
    }
    return week
  }

  const week = getCurrentWeek()
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  const getAvailabilityStatus = (date) => {
    // Mock availability logic
    const dayOfWeek = date.getDay()
    const dateStr = date.toISOString().split("T")[0]
    
    // Sample availability pattern
    if ([1, 2, 3, 4].includes(dayOfWeek)) return "available" // Mon-Thu available
    if ([5].includes(dayOfWeek)) return "busy" // Fri busy
    return "unavailable" // Weekends unavailable
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-success/10 text-success border-success/20"
      case "busy":
        return "bg-warning/10 text-warning border-warning/20"
      case "unavailable":
        return "bg-error/10 text-error border-error/20"
      default:
        return "bg-gray-100 text-gray-500 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return "CheckCircle"
      case "busy":
        return "Clock"
      case "unavailable":
        return "XCircle"
      default:
        return "Circle"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available"
      case "busy":
        return "Busy"
      case "unavailable":
        return "Unavailable"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Availability Calendar</h2>
        <Button>
          <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
          Manage Schedule
        </Button>
      </div>

      {/* Week View */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-primary">This Week</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {week.map((date, index) => {
            const status = getAvailabilityStatus(date)
            const isToday = date.toDateString() === new Date().toDateString()
            
            return (
              <div
                key={index}
                className={`p-4 border rounded-lg text-center transition-all duration-200 cursor-pointer hover:shadow-md ${
                  getStatusColor(status)
                } ${isToday ? "ring-2 ring-accent" : ""}`}
              >
                <div className="text-xs font-medium text-secondary mb-1">
                  {dayNames[index]}
                </div>
                <div className={`text-lg font-bold mb-2 ${isToday ? "text-accent" : ""}`}>
                  {date.getDate()}
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ApperIcon 
                    name={getStatusIcon(status)} 
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium">
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Availability Legend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4">Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded-full"></div>
            <span className="text-sm text-secondary">Available for booking</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span className="text-sm text-secondary">Busy / Limited availability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error rounded-full"></div>
            <span className="text-sm text-secondary">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
          <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
          Upcoming Bookings
        </h3>
        <div className="space-y-4">
          {/* Mock bookings */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Camera" className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary">Fashion Photoshoot</h4>
              <p className="text-secondary text-sm">Vogue Magazine • Studio A</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary">Tomorrow, 9:00 AM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Clock" className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary">4 hours</span>
                </div>
              </div>
            </div>
            <Badge variant="success">Confirmed</Badge>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Video" className="w-6 h-6 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary">Commercial Filming</h4>
              <p className="text-secondary text-sm">Nike • Location TBD</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary">Friday, 2:00 PM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Clock" className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary">6 hours</span>
                </div>
              </div>
            </div>
            <Badge variant="warning">Pending</Badge>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add New Booking
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityTab