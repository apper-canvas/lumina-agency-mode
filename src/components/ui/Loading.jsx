import { cn } from "@/utils/cn"

const Loading = ({ className, variant = "grid" }) => {
  if (variant === "card") {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
        <div className="aspect-[3/4] skeleton" />
        <div className="p-4 space-y-3">
          <div className="h-5 skeleton rounded" />
          <div className="space-y-2">
            <div className="h-4 skeleton rounded w-3/4" />
            <div className="h-4 skeleton rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "detail") {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24 skeleton rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-8 skeleton rounded w-1/2" />
            <div className="h-4 skeleton rounded w-1/3" />
            <div className="h-4 skeleton rounded w-1/4" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 skeleton rounded" />
          <div className="h-4 skeleton rounded w-5/6" />
          <div className="h-4 skeleton rounded w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("portfolio-grid", className)}>
      {Array.from({ length: 8 }, (_, i) => (
        <Loading key={i} variant="card" />
      ))}
    </div>
  )
}

export default Loading