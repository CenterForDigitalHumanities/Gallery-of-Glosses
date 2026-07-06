"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { type ManuscriptLocation } from "@/data/manuscript-locations";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

interface WitnessMapProps {
  locations: ManuscriptLocation[];
  height?: string;
}

/**
 * Inset map showing witness fragment locations for a gloss.
 * Auto-bounds to fit all markers.
 */
export function WitnessMap({
  locations,
  height = "240px",
}: WitnessMapProps) {
  const bounds = useMemo(() => {
    if (locations.length === 0) return undefined;
    const lats = locations.map((l) => l.lat);
    const lons = locations.map((l) => l.lon);
    return [
      [Math.min(...lats), Math.min(...lons)] as [number, number],
      [Math.max(...lats), Math.max(...lons)] as [number, number],
    ];
  }, [locations]);

  const center = useMemo(() => {
    if (locations.length === 0)
      return [50, 2] as [number, number]; // Europe default
    const avgLat = locations.reduce((s, l) => s + l.lat, 0) / locations.length;
    const avgLon = locations.reduce((s, l) => s + l.lon, 0) / locations.length;
    return [avgLat, avgLon] as [number, number];
  }, [locations]);

  if (locations.length === 0) {
    return (
      <div
        className="rounded-lg border bg-muted/30 flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-sm text-muted-foreground">
          No location data available
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ height }}>
      <MapContainer
        center={center}
        zoom={4}
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc, idx) => (
          <Marker key={`${loc.identifier}-${idx}`} position={[loc.lat, loc.lon]}>
            <Tooltip direction="top" offset={[0, -10]}>
              <div className="text-xs">
                <strong>{loc.city}</strong>
                <br />
                {loc.identifier}
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
