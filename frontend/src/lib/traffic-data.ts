"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { TrafficDataSchema } from "@/types/trafficDataSchema";

export interface TrafficData {
  [key: string]: any;
}

async function fetchTrafficData(
  latitude: number,
  longitude: number
): Promise<TrafficData> {
  const apiUrl = "http://127.0.0.1:5000/get_loc";
  const res = await axios.post(apiUrl, {
    latitude,
    longitude,
  });
  return res.data as TrafficDataSchema;
}

export function useTrafficData(
  latitude: number | null,
  longitude: number | null
): UseQueryResult<TrafficData, Error> {
  return useQuery({
    queryKey: ["trafficData", latitude, longitude],
    queryFn: () => {
      if (!latitude || !longitude) {
        throw new Error("Location coordinates are required");
      }
      return fetchTrafficData(latitude, longitude);
    },
    enabled: !!(latitude && longitude), // Only fetch when we have valid coordinates
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes (formerly cacheTime)
  });
}
