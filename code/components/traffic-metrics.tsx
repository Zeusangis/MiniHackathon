import type React from "react"
import { Card } from "@/components/ui/card"
import { Gauge, Clock, Zap, TrendingUp, Target } from "lucide-react"
import type { TrafficData } from "@/components/traffic-summary"

interface TrafficMetricsProps {
  data: TrafficData
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  unit?: string
  trend?: string
  color: string
}

function MetricCard({ icon, label, value, unit, trend, color }: MetricCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700 p-4 hover:bg-slate-900/70 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-white">{value !== null && value !== undefined ? value : "N/A"}</p>
            {unit && <span className="text-slate-400 text-sm">{unit}</span>}
          </div>
          {trend && <p className="text-slate-500 text-xs mt-1">{trend}</p>}
        </div>
      </div>
    </Card>
  )
}

export default function TrafficMetrics({ data }: TrafficMetricsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
        <TrendingUp className="size-5 text-blue-400" />
        Traffic Metrics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          icon={<Gauge className="size-5 text-blue-400" />}
          label="Current Speed"
          value={data.current_speed ?? "N/A"}
          unit={typeof data.current_speed === "number" ? "mph" : undefined}
          color="bg-blue-500/10 border border-blue-500/20"
        />

        <MetricCard
          icon={<Zap className="size-5 text-emerald-400" />}
          label="Free Flow Speed"
          value={data.free_flow_speed ?? "N/A"}
          unit={typeof data.free_flow_speed === "number" ? "mph" : undefined}
          color="bg-emerald-500/10 border border-emerald-500/20"
        />

        <MetricCard
          icon={<Clock className="size-5 text-purple-400" />}
          label="Current Travel Time"
          value={data.current_travel_time ?? "N/A"}
          unit={typeof data.current_travel_time === "number" ? "sec" : undefined}
          color="bg-purple-500/10 border border-purple-500/20"
        />

        <MetricCard
          icon={<Clock className="size-5 text-indigo-400" />}
          label="Free Flow Travel Time"
          value={data.free_flow_travel_time ?? "N/A"}
          unit={typeof data.free_flow_travel_time === "number" ? "sec" : undefined}
          color="bg-indigo-500/10 border border-indigo-500/20"
        />

        <MetricCard
          icon={<Target className="size-5 text-amber-400" />}
          label="Confidence"
          value={
            typeof data.confidence === "number" ? `${(data.confidence * 100).toFixed(1)}%` : (data.confidence ?? "N/A")
          }
          color="bg-amber-500/10 border border-amber-500/20"
        />
      </div>
    </div>
  )
}
