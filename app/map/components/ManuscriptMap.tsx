import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { useState, useMemo, useCallback } from "react";
import { Manuscript } from "@/lib/Manuscript";
import { ChangeView } from "./ChangeView";
import { ManuscriptMarker } from "./ManuscriptMarker";

interface ManuscriptMapProps {
  yearLow: number;
  yearHigh: number;
  manuscripts: Manuscript[];
  handleMarkerClick: (manuscripts: Manuscript[]) => void;
}

const ManuscriptMap: React.FC<ManuscriptMapProps> = ({
  yearLow,
  yearHigh,
  manuscripts,
  handleMarkerClick,
}) => {
  const originCoordinates: Record<string, LatLngTuple> = {
    "Saint-Amand": [50.4472, 3.4312],
    Laon: [49.5641, 3.6199],
    "Buildwas Abbey": [52.6311, -2.4943],
    Chartres: [48.4468, 1.4983],
    Paris: [48.8566, 2.3522],
    Hereford: [52.0567, -2.7156],
    Clairvaux: [48.1785, 4.7441],
    York: [53.9583, -1.0803],
    "Bury St Edmunds": [52.2429, 0.7143],
    "Saint Gall": [47.4223, 9.3748],
  };
  // State for the center of the map.
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(
    originCoordinates["Laon"] as LatLngTuple
  );

  // Prepare the origin string for processing.
  const prepareOrigin = useCallback((origin: string) => {
    let preparedOrigin = origin;
    const separators = ["/", "(", "?"];
    separators.forEach((sep) => {
      if (preparedOrigin.includes(sep)) {
        preparedOrigin = preparedOrigin.split(sep)[0].trim();
      }
    });
    return preparedOrigin;
  }, []);

  // Filter and map manuscripts to include coordinates.
  const manuscriptsWithCoordinates = useMemo(() => {
    return manuscripts
      .filter((manuscript) => manuscript.origin !== "")
      .sort((a, b) => a.date - b.date)
      .map((manuscript) => {
        let origin = prepareOrigin(manuscript.origin);
        const coordinates = originCoordinates[origin] || [0, 0];
        return { ...manuscript, coordinates };
      });
  }, [manuscripts, prepareOrigin]);

  // Handle marker click on the map.
  const getManuscriptWithOrigin = useCallback(
    (origin: string, coordinates: number[]) => {
      const preparedOrigin = prepareOrigin(origin);
      handleMarkerClick(
        manuscriptsWithCoordinates.filter((manuscript) =>
          manuscript.origin.includes(preparedOrigin)
        )
      );
      setMapCenter(coordinates as LatLngTuple);
    },
    [manuscriptsWithCoordinates, handleMarkerClick, prepareOrigin]
  );

  // Get manuscripts with the same origin.
  const getManuscriptsWithSameOrigin = useCallback(
    (origin: string) => {
      const preparedOrigin = prepareOrigin(origin);
      return manuscriptsWithCoordinates.filter(
        (manuscript) =>
          manuscript.origin.includes(preparedOrigin) &&
          manuscript.date >= yearLow &&
          manuscript.date <= yearHigh
      );
    },
    [manuscriptsWithCoordinates, prepareOrigin, yearLow, yearHigh]
  );

  return (
    <div className="mapContainer">
      <MapContainer
        center={[50, 4]}
        zoom={5}
        style={{ width: "100%", height: "77vh", borderRadius: "10px" }}
      >
        <ChangeView center={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
          tileSize={512}
          zoomOffset={-1}
        />
        {manuscriptsWithCoordinates.map(
          (manuscript) =>
            yearLow <= manuscript.date &&
            yearHigh >= manuscript.date && (
              <ManuscriptMarker
                key={manuscript.title}
                manuscript={manuscript}
                handleMarkerClick={getManuscriptWithOrigin}
                getManuscriptsWithSameOrigin={getManuscriptsWithSameOrigin}
                prepareOrigin={prepareOrigin}
              />
            )
        )}
      </MapContainer>
    </div>
  );
};

export default ManuscriptMap;
