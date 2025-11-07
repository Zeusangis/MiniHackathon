import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardControls } from "./_components/dashboard-controls";
import { MetricCard } from "./_components/metric-card";
import { ArterialList } from "./_components/arterial-list";
import { CongestionMap } from "./_components/congestion-map";
import { CongestionTrendsChart } from "./_components/congestion-trend-chart";
import { HourlyTrendsChart } from "./_components/hourly-trend-charts";
import { ArterialTrendsSidebar } from "./_components/arterial-trends-sidebar";

export default function TrafficPage() {
  return (
    <div className="min-h-screen flex flex-col dark">
      <DashboardHeader />
      <DashboardControls />

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <MetricCard
              title="Congestion Level"
              value="44%"
              trend={{
                value: "1% below average",
                direction: "down",
                label: "",
              }}
              variant="primary"
              showInfo
            />
            <MetricCard
              title="Accidents"
              value="9"
              trend={{ value: "4% above baseline", direction: "up", label: "" }}
            />
            <MetricCard
              title="Road Closures"
              value="12"
              trend={{
                value: "2% below baseline",
                direction: "down",
                label: "",
              }}
            />
            <MetricCard
              title="Avg Transit Delay"
              value="3"
              subtitle="min"
              trend={{
                value: "3 min above baseline",
                direction: "up",
                label: "",
              }}
            />
            <MetricCard
              title="CA Congestion Rank"
              value="15th"
              trend={{ value: "Up from 14th", direction: "up", label: "" }}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ArterialList />
            <CongestionMap />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CongestionTrendsChart />
            <HourlyTrendsChart />
          </div>
        </main>

        {/* Sidebar */}
        <ArterialTrendsSidebar />
      </div>
    </div>
  );
}
