// Styles
import "./map.scss";
// React 
import { useEffect, useRef } from "react";
// Leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null);
  const LatLng = [44.85008, -0.57165];

  useEffect(() => {
    // Create map
    mapRef.current = L.map('map', {
      center: LatLng,
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(mapRef.current);

    // Add a popup (on the school as example)
    L.marker(LatLng, { alt: "Refuge Asos'nimaux" }).addTo(mapRef.current).bindPopup(`<p style=" font-size:var(--font-size-xs); display:flex; flex-direction:column; align-items:center;"><strong>ASOS'nimaux</strong> se trouve ici !</p>`).openPopup();

    // Set control position to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    }
  }, []);

  return (
    <article className="informations__article map">
      <h3 className="informations__article__title">Où nous trouver ?</h3>
      <div className="map__wrapper">
        <div id="map" className="map__layer"></div>
      </div>
    </article>
  );
}

export default Map;