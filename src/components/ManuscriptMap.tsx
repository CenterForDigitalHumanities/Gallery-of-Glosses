"use client";

import { useEffect, useState } from "react";
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
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const [hasError, setHasError] = useState(false);

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

  if (hasError) {
    return null;
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ height }}>
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markerIcon && (
          <Marker position={[location.lat, location.lon]} icon={markerIcon}>
            <Tooltip direction="top" offset={[0, -10]}>
              <div className="text-xs">
                <strong>{location.institution}</strong>
                <br />
                {location.city}, {location.country}
              </div>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
