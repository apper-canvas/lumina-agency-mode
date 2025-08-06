import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const HistoryTab = ({ model }) => {
  const [filter, setFilter] = useState("all")

  // Mock history data
  const history = [
    {
      Id: 1,
      type: "booking",
      title: "Fashion Week Runway",
      client: "Milan Fashion Week",
      date: "2024-01-15",
      status: "completed",
      payment: "$2,500",
      description: "Walked for 3 different designers during Milan Fashion Week Spring/Summer collection."
    },
    {
      Id: 2,
      type: "photoshoot",
      title: "Beauty Campaign",
      client: "L'Oreal Paris",
      date: "2024-01-08",
      status: "completed",
      payment: "$1,800",
      description: "Principal model for new skincare line advertisement campaign."
    },
    {
      Id: 3,
      type: "casting",
      title: "Commercial Audition",
      client: "Coca-Cola",
      date: "2024-01-03",
      status: "rejected",
      payment: "-",
      description: "Auditioned for summer commercial campaign. Did not receive callback."
    },
    {
      Id: 4,
      type: "photoshoot",
      title: "Editorial Shoot",
      client: "Vogue Magazine",
      date: "2023-12-20",
      status: "completed",
      payment: "$3,200",
      description: "Featured in 8-page editorial spread for December holiday issue."
    },
    {
      Id: 5,
      type: "booking",
      title: "Brand Ambassador",
      client: "Nike Athletic",
      date: "2023-12-15",
      status: "completed",
      payment: "$5,000",
      description: "3-month brand ambassador contract for new athletic wear line."
    }
  ]

  const filters = [
    { id: "all", label: "All Activity", count: history.length },
    { id: "booking", label: "Bookings", count: history.filter(h => h.type === "booking").length },
    { id: "photoshoot", label: "Photoshoots", count: history.filter(h => h.type === "photoshoot").length },
    { id: "casting", label: "Castings", count: history.filter(h => h.type === "casting").length }
  ]

  const filteredHistory = filter === "all" 
    ? history 
    : history.filter(item => item.type === filter)

  const getTypeIcon = (type) => {
    switch (type) {
      case "booking":
        return "Calendar"
      case "photoshoot":
        return "Camera"
      case "casting":
        return "Users"
      default:
        return "Activity"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-600"
      case "photoshoot":
        return "bg-purple-100 text-purple-600"
      case "casting":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "rejected":
        return <Badge variant="error">Rejected</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const getTotalEarnings = () => {
    return filteredHistory
      .filter(item => item.status === "completed" && item.payment !== "-")
      .reduce((total, item) => {
        const amount = parseFloat(item.payment.replace(/[$,]/g, ""))
        return total + (isNaN(amount) ? 0 : amount)
      }, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Work History</h2>
        <Button>
          <ApperIcon name="Download" className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-blue-700">{history.filter(h => h.status === "completed").length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
              <ApperIcon name="Briefcase" className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-green-700">${getTotalEarnings().toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <ApperIcon name="DollarSign" className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Success Rate</p>
              <p className="text-2xl font-bold text-purple-700">
                {Math.round((history.filter(h => h.status === "completed").length / history.length) * 100)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">This Month</p>
              <p className="text-2xl font-bold text-orange-700">3</p>
            </div>
            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === f.id
                ? "bg-accent text-white shadow-sm"
                : "bg-gray-100 text-secondary hover:bg-gray-200"
            }`}
          >
            <span>{f.label}</span>
            <Badge 
              variant={filter === f.id ? "default" : "default"}
              className={filter === f.id ? "bg-white/20 text-white" : ""}
            >
              {f.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* History Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-primary">Activity Timeline</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredHistory.map((item, index) => (
            <div key={item.Id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(item.type)}`}>
                  <ApperIcon name={getTypeIcon(item.type)} className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-primary">{item.title}</h4>
                      <p className="text-secondary">{item.client}</p>
                      <p className="text-sm text-secondary mt-2 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      {getStatusBadge(item.status)}
                      {item.payment !== "-" && (
                        <span className="text-lg font-bold text-success">{item.payment}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-secondary">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString("en-US", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Tag" className="w-4 h-4" />
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="History" className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-primary mb-2">No history found</h3>
            <p className="text-secondary">
              {filter === "all" 
                ? "This model hasn't completed any projects yet." 
                : `No ${filter} activities found for this model.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryTab