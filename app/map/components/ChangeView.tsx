import { LatLngTuple } from "leaflet"; // Importing LatLngTuple from Leaflet to specify the center's type
import { useMap } from "react-leaflet"; // Using useMap hook from react-leaflet to gain access to map instance

// ChangeView component. It takes a 'center' prop and changes the map view to that location.
// The 'center' prop is an array that contains latitude and longitude values respectively.
export const ChangeView: React.FC<{ center: LatLngTuple }> = ({ center }) => {
  const map = useMap(); // Using the useMap hook to get the current map instance
  map.flyTo(center); // Using the 'flyTo' function from leaflet to animate the map to the desired 'center' location

  // As this component doesn't render anything to the DOM, we return null
  return null;
};
