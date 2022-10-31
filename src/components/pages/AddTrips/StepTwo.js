/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

//config
const initView = {
  latitude: 21.000274477955738,
  longitude: 105.84253138495198,
  zoom: 16,
};

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

function StepTwo(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(105.845);
  const [lat, setLat] = useState(20.9997);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/cycling",
    });

    map.current.addControl(directions, "top-right");
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default StepTwo;
