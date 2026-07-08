"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon } from "leaflet";
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
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const [hasError, setHasError] = useState(false);

  /* Create a Leaflet Icon with CDN image URLs — must run client-side only */
  useEffect(() => {
    import("leaflet")
      .then((L) => {
        const leaflet = L.default as typeof import("leaflet");
        const icon = leaflet.icon({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        setMarkerIcon(icon);
      })
      .catch(() => setHasError(true));
  }, []);
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

  if (locations.length === 0 || hasError) {
    return null;
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ height }}>
      <MapContainer
        center={center}
        zoom={4}
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markerIcon &&
          locations.map((loc, idx) => (
            <Marker key={`${loc.identifier}-${idx}`} position={[loc.lat, loc.lon]} icon={markerIcon}>
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
