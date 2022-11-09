/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useDispatch, useSelector } from "react-redux";
import { ClickAwayListener } from "@material-ui/core";
import { actFetchNewTrip } from "~/redux/actions";

//config
mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

function StepTwo({ handleEnterData }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const dispatch = useDispatch();
  const [lng, setLng] = useState(105.845);
  const [lat, setLat] = useState(20.9997);
  const [zoom, setZoom] = useState(16);
  const checkRender = useRef(false);
  const { newTrip } = useSelector((state) => state.pages);

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
      profile: "mapbox/driving",
      alternatives: "false",
      geometries: "geojson",
    });

    map.current.scrollZoom.enable();
    map.current.addControl(directions, "top-right");

    const clearances = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.47426, 38.06673],
          },
          properties: {
            clearance: "13' 2",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.47208, 38.06694],
          },
          properties: {
            clearance: "13' 7",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.47184, 38.06694],
          },
          properties: {
            clearance: "13' 7",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.60485, 38.12184],
          },
          properties: {
            clearance: "13' 7",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.61905, 37.87504],
          },
          properties: {
            clearance: "12' 0",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.55946, 38.30213],
          },
          properties: {
            clearance: "13' 6",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.27235, 38.04954],
          },
          properties: {
            clearance: "13' 6",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.27264, 37.82917],
          },
          properties: {
            clearance: "11' 6",
          },
        },
      ],
    };

    // eslint-disable-next-line no-undef
    const obstacle = turf.buffer(clearances, 0.25, { units: "kilometers" });

    map.current.on("load", () => {
      map.current.addLayer({
        id: "clearances",
        type: "fill",
        source: {
          type: "geojson",
          data: obstacle,
        },
        layout: {},
        paint: {
          "fill-color": "#f03b20",
          "fill-opacity": 0.5,
          "fill-outline-color": "#f03b20",
        },
      });

      // Create sources and layers for the returned routes.
      // There will be a maximum of 3 results from the Directions API.
      // We use a loop to create the sources and layers.
      for (let i = 0; i < 3; i++) {
        map.current.addSource(`route${i}`, {
          type: "geojson",
          data: {
            type: "Feature",
          },
        });

        map.current.addLayer({
          id: `route${i}`,
          type: "line",
          source: `route${i}`,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#cccccc",
            "line-opacity": 0.5,
            "line-width": 13,
            "line-blur": 0.5,
          },
        });
      }
    });

    directions.on("route", async (event) => {
      const reports = document.getElementById("reports");
      reports.innerHTML = "";
      const report = reports.appendChild(document.createElement("div"));
      // Add IDs to the routes
      const routes = await event.route.map((route, index) => ({
        ...route,
        id: index,
      }));

      // set info trip
      const dataTrip = { ...newTrip };
      const tripDetail = routes[0].legs[0].steps;
      let measure = document.querySelector(".mapbox-directions-multiple");
      let time = measure.querySelector("h1").textContent;
      let distance = measure.querySelector("span").textContent;

      const place = document.querySelectorAll(".mapboxgl-ctrl-geocoder");
      const startPlace = place[0].querySelector("input").value;
      const endPlace = place[1].querySelector("input").value;

      dataTrip["start_place"] = startPlace;
      dataTrip["end_place"] = endPlace;
      dataTrip["trip_info"] = JSON.stringify({
        time: time,
        distance: distance,
        tripDetail: JSON.stringify(tripDetail),
      });
      const params = {
        data: dataTrip,
      };
      dispatch(actFetchNewTrip(params));

      //set language
      map.current.setLayoutProperty("country-label", "text-field", ["vi"]);

      // Hide all routes by setting the opacity to zero.
      for (let i = 0; i < 3; i++) {
        map.current.setLayoutProperty(`route${i}`, "visibility", "none");
      }

      for (const route of routes) {
        // Make each route visible, by setting the opacity to 50%.
        map.current.setLayoutProperty(
          `route${route.id}`,
          "visibility",
          "visible"
        );

        // Get GeoJSON LineString feature of route
        // eslint-disable-next-line no-undef
        const routeLine = polyline.toGeoJSON(route.geometry);

        // Update the data for the route, updating the visual.
        map.current.getSource(`route${route.id}`).setData(routeLine);

        // eslint-disable-next-line no-undef
        const isClear = turf.booleanDisjoint(obstacle, routeLine) === true;

        report.className = isClear ? "item" : "item warning";

        if (isClear) {
          map.current.setPaintProperty(
            `route${route.id}`,
            "line-color",
            "#74c476"
          );
        } else {
          map.current.setPaintProperty(
            `route${route.id}`,
            "line-color",
            "#de2d26"
          );
        }
        report.id = `report-${route.id}`;
      }
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="step2">
      <div id="map" ref={mapContainer} className="map-container"></div>
      <div id="reports" className="reports"></div>
    </div>
  );
}

export default StepTwo;
