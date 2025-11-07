"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LocationHeader from "@/components/location-header"
import TrafficMetrics from "@/components/traffic-metrics"
import AISummary from "@/components/ai-summary"
import { Loader2 } from "lucide-react"

export interface TrafficData {
  current_speed?: number
  free_flow_speed?: number
  current_travel_time?: number
  free_flow_travel_time?: number
  confidence?: number
  ai_summary?: string
  [key: string]: any
}

interface Coordinates {
  lat: number
  lon: number
}

export default function TrafficSummary() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<TrafficData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  const detectLocation = () => {
    setLocationError(null)
    setError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        setCoordinates(coords)
        fetchTrafficData(coords)
      },
      (err) => {
        setLoading(false)
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please enable location access.")
            break
          case err.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case err.TIMEOUT:
            setLocationError("Location request timed out.")
            break
          default:
            setLocationError("An unknown error occurred.")
            break
        }
      },
    )
  }

  const fetchTrafficData = async (coords: Coordinates) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:5000/get_loc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch traffic data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    detectLocation()
  }, [])

  const handleRefresh = () => {
    setResults(null)
    detectLocation()
  }

  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-white text-balance">Traffic Summary Dashboard</CardTitle>
          <CardDescription className="text-slate-300 text-base">
            Real-time traffic data and AI-powered insights for your location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LocationHeader coordinates={coordinates} onRefresh={handleRefresh} loading={loading} />

          {locationError && (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-400 text-sm font-medium">{locationError}</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm font-medium">Error: {error}</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="size-10 animate-spin text-blue-400" />
              <p className="text-slate-400 text-sm">Fetching traffic data...</p>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TrafficMetrics data={results} />
              {results.ai_summary && <AISummary summary={results.ai_summary} />}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
