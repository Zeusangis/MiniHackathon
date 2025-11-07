import type React from "react";
import { Card } from "@/components/ui/card";
import { Gauge, Clock, Zap, TrendingUp, Target } from "lucide-react";
import type { TrafficData } from "@/components/traffic/traffic-summary";

interface TrafficMetricsProps {
  data: TrafficData;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  color: string;
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  trend,
  color,
}: MetricCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700 p-4 hover:bg-slate-900/70 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-white">
              {value !== null && value !== undefined ? value : "N/A"}
            </p>
            {unit && <span className="text-slate-400 text-sm">{unit}</span>}
          </div>
          {trend && <p className="text-slate-500 text-xs mt-1">{trend}</p>}
        </div>
      </div>
    </Card>
  );
}

export default function TrafficMetrics({ data }: TrafficMetricsProps) {
  // Normalize incoming data: support different casing / shapes from backend
  const normalize = (raw: any) => {
    if (!raw) return {} as TrafficData;

    const pick = (keys: string[]) => {
      const tryPaths = (k: string) => {
        // check top-level
        if (raw && raw[k] !== undefined && raw[k] !== null) return raw[k];
        // check nested traffic_data
        if (
          raw &&
          raw.traffic_data &&
          raw.traffic_data[k] !== undefined &&
          raw.traffic_data[k] !== null
        )
          return raw.traffic_data[k];
        // check root.traffic_data (some schemas wrap under root)
        if (
          raw &&
          raw.root &&
          raw.root.traffic_data &&
          raw.root.traffic_data[k] !== undefined &&
          raw.root.traffic_data[k] !== null
        )
          return raw.root.traffic_data[k];
        // check root-level keys under root
        if (
          raw &&
          raw.root &&
          raw.root[k] !== undefined &&
          raw.root[k] !== null
        )
          return raw.root[k];
        return undefined;
      };

      for (const k of keys) {
        const v = tryPaths(k);
        if (v !== undefined && v !== null) return v;
      }
      return undefined;
    };

    const current_speed = pick([
      "current_speed",
      "CurrentSpeed",
      "currentSpeed",
      "Current_Speed",
      "Current Speed",
      "Current_Speed_MPH",
    ]);
    const free_flow_speed = pick([
      "free_flow_speed",
      "FreeFlowSpeed",
      "freeFlowSpeed",
      "free_flow_speed_mph",
      "Free Flow Speed",
      "FreeFlowSpeed_MPH",
    ]);
    const current_travel_time = pick([
      "current_travel_time",
      "CurrentTravelTimeSec",
      "currentTravelTimeSec",
      "current_travel_time_sec",
      "Current Travel Time (sec)",
      "Current Travel Time (s)",
    ]);
    const free_flow_travel_time = pick([
      "free_flow_travel_time",
      "FreeFlowTravelTimeSec",
      "freeFlowTravelTimeSec",
      "free_flow_travel_time_sec",
      "Free Flow Travel Time (sec)",
      "Free Flow Travel Time (s)",
    ]);
    const confidence = pick(["confidence", "Confidence"]);
    const ai_summary = pick([
      "ai_summary",
      "AI_Summary",
      "aiSummary",
      "ai-summary",
      "ai summary",
    ]);

    return {
      current_speed,
      free_flow_speed,
      current_travel_time,
      free_flow_travel_time,
      confidence,
      ai_summary,
      // keep raw copy for anything else
      _raw: raw,
    } as TrafficData;
  };

  const d = normalize(data);

  // Derived metrics
  const fmtNumber = (n: number | undefined | null, digits = 1) =>
    typeof n === "number" ? Number(n.toFixed(digits)) : "N/A";

  const speedRatio =
    typeof d.current_speed === "number" &&
    typeof d.free_flow_speed === "number" &&
    d.free_flow_speed > 0
      ? d.current_speed / d.free_flow_speed
      : undefined;

  const delayPercent =
    typeof d.current_travel_time === "number" &&
    typeof d.free_flow_travel_time === "number" &&
    d.free_flow_travel_time > 0
      ? ((d.current_travel_time - d.free_flow_travel_time) /
          d.free_flow_travel_time) *
        100
      : undefined;

  const travelTimeDiff =
    typeof d.current_travel_time === "number" &&
    typeof d.free_flow_travel_time === "number"
      ? d.current_travel_time - d.free_flow_travel_time
      : undefined;

  const congestionLabel = (pct?: number) => {
    if (pct === undefined || pct === null || Number.isNaN(pct))
      return "Unknown";
    if (pct <= 0) return "Free Flow";
    if (pct <= 10) return "Low";
    if (pct <= 30) return "Moderate";
    if (pct <= 100) return "Severe";
    return "Critical";
  };

  const confidenceDisplay =
    typeof d.confidence === "number"
      ? `${(d.confidence * 100).toFixed(0)}%`
      : (d.confidence ?? "N/A");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        Traffic Metrics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          icon={<Gauge className="w-5 h-5 text-blue-400" />}
          label="Current Speed"
          value={fmtNumber(d.current_speed)}
          unit={typeof d.current_speed === "number" ? "mph" : undefined}
          color="bg-blue-500/10 border border-blue-500/20"
        />

        <MetricCard
          icon={<Zap className="w-5 h-5 text-emerald-400" />}
          label="Free Flow Speed"
          value={fmtNumber(d.free_flow_speed)}
          unit={typeof d.free_flow_speed === "number" ? "mph" : undefined}
          color="bg-emerald-500/10 border border-emerald-500/20"
        />

        <MetricCard
          icon={<Clock className="w-5 h-5 text-purple-400" />}
          label="Current Travel Time"
          value={
            typeof d.current_travel_time === "number"
              ? `${Math.round(d.current_travel_time)}s`
              : "N/A"
          }
          color="bg-purple-500/10 border border-purple-500/20"
        />

        <MetricCard
          icon={<Clock className="w-5 h-5 text-indigo-400" />}
          label="Free Flow Travel Time"
          value={
            typeof d.free_flow_travel_time === "number"
              ? `${Math.round(d.free_flow_travel_time)}s`
              : "N/A"
          }
          color="bg-indigo-500/10 border border-indigo-500/20"
        />

        <MetricCard
          icon={<Target className="w-5 h-5 text-amber-400" />}
          label="Confidence"
          value={confidenceDisplay}
          color="bg-amber-500/10 border border-amber-500/20"
        />

        <MetricCard
          icon={<Zap className="w-5 h-5 text-sky-400" />}
          label="Speed Ratio"
          value={
            typeof speedRatio === "number" ? fmtNumber(speedRatio, 2) : "N/A"
          }
          trend={
            typeof speedRatio === "number"
              ? `${Math.round((1 - speedRatio) * 100)}% slower than free flow`
              : undefined
          }
          color="bg-sky-500/10 border border-sky-500/20"
        />

        <MetricCard
          icon={<TrendingUp className="w-5 h-5 text-rose-400" />}
          label="Delay"
          value={
            typeof delayPercent === "number"
              ? `${fmtNumber(delayPercent, 1)}%`
              : "N/A"
          }
          trend={
            typeof travelTimeDiff === "number"
              ? `${Math.round(travelTimeDiff)}s extra travel time`
              : undefined
          }
          color="bg-rose-500/10 border border-rose-500/20"
        />

        <MetricCard
          icon={<Gauge className="w-5 h-5 text-violet-400" />}
          label="Congestion"
          value={congestionLabel(delayPercent)}
          color="bg-violet-500/10 border border-violet-500/20"
        />
      </div>
    </div>
  );
}
