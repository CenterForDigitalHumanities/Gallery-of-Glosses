"use client";

import dynamic from "next/dynamic";
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
  const uniqueLocations = manuscriptLocations.filter(
    (loc, idx, self) => idx === self.findIndex((l) => l.geonameId === loc.geonameId)
  );

  const center: [number, number] = [50, 2]; // Europe

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
          {manuscriptLocations.map((loc, idx) => (
            <Marker key={`${loc.identifier}-${idx}`} position={[loc.lat, loc.lon]}>
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
