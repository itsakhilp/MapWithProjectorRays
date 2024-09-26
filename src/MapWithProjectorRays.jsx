import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import myIcon from "./assets/pin.png";

const customIcon = new L.Icon({
  iconUrl:myIcon, 
  iconSize: [40, 40], 
  iconAnchor: [20, 20], 
});

const MapWithProjectorRays = () => {

  const [icon1Position, setIcon1Position] = useState([17.415044, 78.486671]);
  const [icon2Position, setIcon2Position] = useState([17.395044, 78.556791]);

  const handleDragEnd1 = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setIcon1Position([lat, lng]);
  };

  const handleDragEnd2 = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setIcon2Position([lat, lng]);
  };

  
  const getRayLines = () => {
    const numRays = 30; 
    const rayLines = [];
    const spacingFactor = 0.0002; 
    for (let i = -Math.floor(numRays / 2); i <= Math.floor(numRays / 2); i++) {
      const offset = i * spacingFactor;

      
      const rayEndPoint = [icon2Position[0] + offset, icon2Position[1] + offset];
      rayLines.push([icon1Position, rayEndPoint]);
    }

    return rayLines;
  };

  return (
    <div>
      <MapContainer
        center={icon1Position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
       
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        
        {getRayLines().map((ray, index) => (
          <Polyline
            key={index}
            positions={ray}
            color={index === Math.floor(getRayLines().length / 2) ? "blue" : "blue"}
            weight={index === Math.floor(getRayLines().length / 2) ? 5 : 2}
            opacity={index === Math.floor(getRayLines().length / 2) ? 0.8 : 0.5}
          />
        ))}

       
        <Marker
          position={icon1Position}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: handleDragEnd1,
          }}
        ></Marker>

        <Marker
          position={icon2Position}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: handleDragEnd2,
          }}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default MapWithProjectorRays;
