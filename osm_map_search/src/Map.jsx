import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "./assets/map.css";

const searchBaseUrl = "https://nominatim.openstreetmap.org/search.php?";

function ResetCenterView(props) {
  const { postion } = props;

  const map = useMap();
  map.setView(postion, 12, {
    animate: true,
  });

  return null;
}

function Map(props) {
  let { selectedLocation, getCenter } = props;
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState(getCenter);
  const [marker, setMarker] = useState(selectedLocation);
  const [displayLocations, setDisplayLocations] = useState([]);

  function searchLocation() {
    const url = `${searchBaseUrl}q=${search}&format=json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const top5 = data
          .map((location) => {
            return {
              name: location.display_name,
              lat: location.lat,
              lon: location.lon,
            };
          })
          .slice(0, 5);
        setDisplayLocations(top5);
        setCenter([top5[0].lat, top5[0].lon]);
      });
  }

  return (
    <div className="wholeMap">
      <div className="mapContainer">
        <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={marker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            <Tooltip>
              <h3>This is a special tooltip for the marker at {marker}</h3>
            </Tooltip>
          </Marker>
          <ResetCenterView postion={center} />
        </MapContainer>
      </div>
      <div className="mapSearch">
        <input
          value={search}
          type="text"
          placeholder=" Search a location.."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button onClick={searchLocation}>Search</button>
        <div className="searchResults">
          {displayLocations.map((location, index) => {
            return (
              <p
                onClick={() => {
                  setMarker([location.lat, location.lon]);
                }}
                key={index}
              >
                {location.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Map;

// TODO:
// onclick of search result, set the selectedLocation to that location
// onsearch set buildingbounds to that location[0]
