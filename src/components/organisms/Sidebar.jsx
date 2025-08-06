import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import NavigationItem from "@/components/molecules/NavigationItem"
import Button from "@/components/atoms/Button"
import { useModelData } from "@/hooks/useModelData"

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { models } = useModelData()

  const navigationItems = [
    { 
      icon: "Users", 
      label: "Models", 
      path: "/models", 
      available: true,
      count: models?.length 
    },
    { 
      icon: "Building2", 
      label: "Clients", 
      path: "/clients", 
      available: false 
    },
    { 
      icon: "Briefcase", 
      label: "Jobs", 
      path: "/jobs", 
      available: false 
    },
    { 
      icon: "Calendar", 
      label: "Bookings", 
      path: "/bookings", 
      available: false 
    },
    { 
      icon: "CalendarDays", 
      label: "Calendar", 
      path: "/calendar", 
      available: false 
    },
    { 
      icon: "MessageSquare", 
      label: "Messages", 
      path: "/messages", 
      available: false 
    },
    { 
      icon: "FileText", 
      label: "Documents", 
      path: "/documents", 
      available: false 
    },
    { 
      icon: "BarChart3", 
      label: "Analytics", 
      path: "/analytics", 
      available: false 
    }
  ]

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={toggleMobile}
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
      >
        <ApperIcon name={isMobileOpen ? "X" : "Menu"} className="w-5 h-5" />
      </Button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Lumina</h1>
                <p className="text-xs text-secondary">Agency CRM</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                available={item.available}
                count={item.count}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  Agency Manager
                </p>
                <p className="text-xs text-secondary truncate">
                  admin@lumina.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobile}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-primary">Lumina</h1>
                        <p className="text-xs text-secondary">Agency CRM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navigationItems.map((item) => (
                    <div key={item.path} onClick={toggleMobile}>
                      <NavigationItem
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        available={item.available}
                        count={item.count}
                      />
                    </div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar