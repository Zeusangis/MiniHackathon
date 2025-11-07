"use client";

import { useState, useEffect } from "react";

/**
 * Utilities for reading the browser geolocation.
 *
 * Exports:
 * - getCurrentLocation(options?): Promise<{ latitude, longitude }>
 * - useGeolocation(options?): React hook that returns { latitude, longitude } | null
 */

export type LatLong = { latitude: number; longitude: number };

export function getCurrentLocation(
  options?: PositionOptions
): Promise<LatLong> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation API not available"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => reject(err),
      options
    );
  });
}

// React hook for continuous geolocation watching
export function useGeolocation(options?: PositionOptions) {
  const [pos, setPos] = useState<LatLong | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;

    let mounted = true;
    const id = navigator.geolocation.watchPosition(
      (p) => {
        if (!mounted) return;
        setPos({ latitude: p.coords.latitude, longitude: p.coords.longitude });
      },
      () => {},
      options
    );

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pos;
}
// (no top-level sample values) - use getCurrentLocation() or useGeolocation() in app code
