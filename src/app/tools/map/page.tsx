"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon } from "leaflet";
import { manuscriptLocations } from "@/data/manuscript-locations";

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

const Map = () => {
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

  const uniqueLocations = manuscriptLocations.filter(
    (loc, idx, self) => idx === self.findIndex((l) => l.geonameId === loc.geonameId)
  );

  const center: [number, number] = [50, 2]; // Europe

  if (hasError) {
    return null;
  }

  return (
    <div className="text-foreground p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Geolocated Witnesses</h1>
      <p className="text-muted-foreground mb-4">
        Physical holding locations for {manuscriptLocations.length} manuscripts across{" "}
        {uniqueLocations.length} cities.
      </p>
      <div className="rounded-lg border overflow-hidden" style={{ height: "600px" }}>
        <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {markerIcon &&
            manuscriptLocations.map((loc, idx) => (
              <Marker key={`${loc.identifier}-${idx}`} position={[loc.lat, loc.lon]} icon={markerIcon}>
                <Tooltip direction="top" offset={[0, -10]}>
                  <div className="text-xs">
                    <strong>{loc.identifier}</strong>
                    <br />
                    {loc.institution}
                    <br />
                    {loc.city}, {loc.country}
                  </div>
                </Tooltip>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
