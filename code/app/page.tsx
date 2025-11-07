import TrafficSummary from "@/components/traffic-summary"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center p-4">
      <TrafficSummary />
    </main>
  )
}
