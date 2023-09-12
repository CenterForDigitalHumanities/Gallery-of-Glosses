import { LatLngTuple, icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Manuscript } from "@/lib/Manuscript";

interface ManuscriptMarkerProps {
  manuscript: Manuscript & { coordinates: LatLngTuple };
  handleMarkerClick: (origin: string, coordinates: LatLngTuple) => void;
  getManuscriptsWithSameOrigin: (origin: string) => Manuscript[];
  prepareOrigin: (origin: string) => string;
}

export const ManuscriptMarker: React.FC<ManuscriptMarkerProps> = ({
  manuscript,
  handleMarkerClick,
  getManuscriptsWithSameOrigin,
  prepareOrigin,
}) => {
  const markerIcon = icon({
    iconUrl: "/images/marker.png",
    iconSize: [32, 32],
  });

  return (
    <Marker
      position={manuscript.coordinates}
      icon={markerIcon}
      eventHandlers={{
        click: () =>
          handleMarkerClick(manuscript.origin, manuscript.coordinates),
      }}
      key={`${manuscript.title}-${manuscript.identifier}`}
    >
      <Popup>
        <div>
          <strong>manuscripts:</strong>
          <div className="flex gap-1">
            {getManuscriptsWithSameOrigin(manuscript.origin).map(
              (sameOriginManuscript) => (
                <div key={sameOriginManuscript.identifier}>
                  {sameOriginManuscript.alternative},
                </div>
              )
            )}
          </div>
          <strong>Origin:</strong> {prepareOrigin(manuscript.origin)}
        </div>
      </Popup>
    </Marker>
  );
};
