"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense, lazy } from "react";
import { useGeolocation } from "@/lib/latitudeLongitude";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrafficData } from "@/lib/traffic-data";

const LeafletMap = lazy(() => import("./leaflet-map-wrapper"));

const MapLoading = () => (
  <div className="h-[400px] bg-secondary/30 flex items-center justify-center">
    <p className="text-muted-foreground">Loading map...</p>
  </div>
);

export function CongestionMap() {
  // Get user's geolocation and update map center on change
  const pos = useGeolocation();
  const coords = pos
    ? { latitude: pos.latitude, longitude: pos.longitude }
    : undefined;

  const { data, isLoading, error } = useTrafficData(
    coords?.latitude ?? null,
    coords?.longitude ?? null
  );
  console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Congestion Hot Spots</CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <Suspense fallback={<MapLoading />}>
          <LeafletMap
            initialCenter={
              coords ? [coords.latitude, coords.longitude] : undefined
            }
            currentPosition={
              coords ? [coords.latitude, coords.longitude] : undefined
            }
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
