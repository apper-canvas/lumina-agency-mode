import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ComingSoonPage = ({ section }) => {
  const sectionConfig = {
    clients: {
      title: "Clients",
      description: "Client database and company management",
      icon: "Building2",
      features: [
        "Client contact management",
        "Company profiles and preferences", 
        "Booking history and relationships",
        "Contract management"
      ]
    },
    jobs: {
      title: "Jobs",
      description: "Job postings and casting organization",
      icon: "Briefcase",
      features: [
        "Job posting creation and management",
        "Casting call organization",
        "Application tracking",
        "Client brief management"
      ]
    },
    bookings: {
      title: "Bookings",
      description: "Schedule management and conflict detection",
      icon: "Calendar",
      features: [
        "Booking calendar and scheduling",
        "Conflict detection and resolution",
        "Model availability tracking",
        "Booking confirmation system"
      ]
    },
    calendar: {
      title: "Calendar",
      description: "Integrated calendar view of all bookings",
      icon: "CalendarDays",
      features: [
        "Unified calendar view",
        "Multi-model scheduling",
        "Event management",
        "Timeline visualization"
      ]
    },
    messages: {
      title: "Messages",
      description: "Internal communication hub",
      icon: "MessageSquare",
      features: [
        "Internal team messaging",
        "Client communication threads",
        "Model notifications",
        "File and media sharing"
      ]
    },
    documents: {
      title: "Documents",
      description: "Contract templates and legal paperwork",
      icon: "FileText",
      features: [
        "Contract template management",
        "Digital document signing",
        "Legal paperwork organization",
        "Document version control"
      ]
    },
    analytics: {
      title: "Analytics",
      description: "Agency performance dashboards",
      icon: "BarChart3",
      features: [
        "Revenue and booking analytics",
        "Model performance metrics",
        "Client relationship insights",
        "Business growth tracking"
      ]
    }
  }

  const config = sectionConfig[section] || {
    title: "Feature",
    description: "Coming soon",
    icon: "Clock",
    features: []
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-24 h-24 bg-gradient-to-br from-accent/10 via-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ApperIcon name={config.icon} className="w-12 h-12 text-accent" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-primary mb-4"
            >
              {config.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-secondary max-w-2xl mx-auto"
            >
              {config.description}
            </motion.p>
          </div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-accent/5 via-blue-50 to-indigo-50 p-8 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-primary mb-2">Coming Soon</h2>
              <p className="text-secondary">
                We're working hard to bring you this feature. Stay tuned for updates!
              </p>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-semibold text-primary mb-4">Planned Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent/10 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Check" className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-secondary">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent">
                <ApperIcon name="Bell" className="w-4 h-4 mr-2" />
                Notify Me When Ready
              </Button>
              <Button variant="outline">
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back to Models
              </Button>
            </div>
            
            <p className="text-sm text-secondary">
              Want to request a specific feature? <a href="#" className="text-accent hover:underline">Send us feedback</a>
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <h3 className="text-xl font-bold text-primary mb-6 text-center">Development Roadmap</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div>
                  <p className="font-medium text-primary">Phase 1: Model Management</p>
                  <p className="text-sm text-success">Completed ✓</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div>
                  <p className="font-medium text-primary">Phase 2: {config.title} System</p>
                  <p className="text-sm text-warning">In Development</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-secondary">Phase 3: Advanced Analytics</p>
                  <p className="text-sm text-secondary">Planned</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComingSoonPage