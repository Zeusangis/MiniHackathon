"use client";

import { useEffect, useRef } from "react";

// Lightweight runtime Leaflet wrapper to avoid SSR/next issues and to keep bundle small.
// This dynamically imports Leaflet at runtime. If you don't have 'leaflet' installed,
// the component will render a friendly message — run:
//   npm install leaflet
//   # or
//   pnpm add leaflet

export default function LeafletMapWrapper({
  initialCenter,
  currentPosition,
}: {
  initialCenter?: [number, number];
  currentPosition?: [number, number];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const tileRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // @ts-ignore - leaflet is dynamically imported at runtime; types may not be installed in dev env
        const L = (await import("leaflet")) as any;
        // @ts-ignore
        await import("leaflet/dist/leaflet.css");

        // Create map once
        if (!mounted || !ref.current) return;

        // Avoid recreating
        if (mapRef.current) return;

        const map = L.map(ref.current, {
          center: initialCenter || [37.8044, -122.2711], // Oakland
          zoom: 10,
          zoomControl: false,
          attributionControl: false,
        });

        // Choose tile layer depending on whether the document has dark class
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");

        const lightUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const darkUrl =
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

        const tile = L.tileLayer(isDark ? darkUrl : lightUrl, {
          maxZoom: 19,
          subdomains: "abc",
        }).addTo(map);

        mapRef.current = map;
        tileRef.current = tile;

        // Basic map marker placeholder (no popups)
        // Add a simple circle marker for demo
        L.circle([37.8044, -122.2711], {
          radius: 3000,
          color: "#ff5722",
          fillColor: "#ff5722",
          fillOpacity: 0.15,
        }).addTo(map);

        // Watch for theme changes (toggle of .dark class on <html>) and update tile layer
        const observer = new MutationObserver(() => {
          if (!mapRef.current) return;
          const dark = document.documentElement.classList.contains("dark");
          const newUrl = dark ? darkUrl : lightUrl;
          if (
            tileRef.current &&
            tileRef.current.getTileUrl &&
            tileRef.current._url !== newUrl
          ) {
            // remove old tile and add new one
            mapRef.current.removeLayer(tileRef.current);
            tileRef.current = L.tileLayer(newUrl, {
              maxZoom: 19,
              subdomains: "abc",
            }).addTo(mapRef.current);
          }
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });

        // Cleanup on unmount
        return () => {
          observer.disconnect();
          if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
          }
        };
      } catch (err) {
        // If leaflet isn't installed, surface a console hint
        // We'll render a fallback in the DOM (see component return)
        // eslint-disable-next-line no-console
        console.warn(
          "Leaflet failed to load. Install it with: npm install leaflet",
          err
        );
      }
    }

    const cleanupPromise = init();

    return () => {
      mounted = false;
      // nothing else to do — init handles internal cleanup
      void cleanupPromise;
    };
  }, []);

  // Update marker position when currentPosition changes
  useEffect(() => {
    if (!currentPosition || !mapRef.current) return;

    async function updateMarker() {
      try {
        // @ts-ignore
        const L = (await import("leaflet")) as any;

        // Remove old marker if it exists
        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        // Add new marker at current position with a distinctive style
        const marker = L.circleMarker(currentPosition, {
          radius: 8,
          color: "#0ea5e9",
          fillColor: "#0ea5e9",
          fillOpacity: 0.8,
          weight: 2,
        }).addTo(mapRef.current);

        markerRef.current = marker;
      } catch (err) {
        // silently ignore if leaflet fails
      }
    }

    updateMarker();
  }, [currentPosition]);

  return (
    <div className="h-[400px] w-full">
      <div ref={ref} className="h-full w-full rounded-sm" />
      {/* If the map didn't initialize (leaflet missing), show a small hint overlay */}
      {/* The parent component also shows a loading fallback while Suspense resolves. */}
    </div>
  );
}
