"use client";

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

interface ManuscriptMapProps {
  location: ManuscriptLocation;
  height?: string;
}

/**
 * Map showing the holding location of a single manuscript.
 */
export function ManuscriptMap({
  location,
  height = "200px",
}: ManuscriptMapProps) {
  return (
    <div className="rounded-lg border overflow-hidden" style={{ height }}>
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[location.lat, location.lon]}>
          <Tooltip direction="top" offset={[0, -10]}>
            <div className="text-xs">
              <strong>{location.institution}</strong>
              <br />
              {location.city}, {location.country}
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
