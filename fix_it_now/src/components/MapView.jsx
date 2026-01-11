import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({location}){
    if(!location) return null;
    return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={14}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
}