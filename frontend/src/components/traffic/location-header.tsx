"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, RefreshCw } from "lucide-react";

interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationHeaderProps {
  coordinates: Coordinates | null;
  loading: boolean;
  liveTracking: boolean;
  onToggleLive: () => void;
}

export default function LocationHeader({
  coordinates,
  loading,
  liveTracking,
  onToggleLive,
}: LocationHeaderProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <MapPin className="size-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-300 mb-1">
              Current Location
            </h3>
            {coordinates ? (
              <div className="space-y-1">
                <p className="text-white font-mono text-sm">
                  Lat: {coordinates.lat.toFixed(6)}
                </p>
                <p className="text-white font-mono text-sm">
                  Lon: {coordinates.lon.toFixed(6)}
                </p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Detecting location...</p>
            )}
          </div>
        </div>
        <Button
          onClick={onToggleLive}
          variant={liveTracking ? "default" : "outline"}
          size="sm"
          className={`bg-slate-800 border-slate-600 text-white shrink-0 ${
            liveTracking ? "bg-emerald-600/20 border-emerald-500/30" : ""
          }`}
        >
          <RefreshCw
            className={`size-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          {liveTracking ? "Live: On" : "Live: Off"}
        </Button>
      </div>
    </Card>
  );
}
