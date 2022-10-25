/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react';
import MapGL , {GeolocateControl, Marker, NavigationControl, Popup} from 'react-map-gl';
import {Room} from '@material-ui/icons/';
import 'mapbox-gl/dist/mapbox-gl.css'; 

//config
const initView = {
  latitude: 21.000274477955738,
  longitude: 105.84253138495198,
  zoom: 16
};

function StepTwo(props) {
  const [viewPort, setViewPort] = useState(initView);
  const [showPopup, togglePopup] = useState(false);
  const mapRef = useRef();
  
  useEffect(() => {
    
  },[])
  return (
    <MapGL  
       ref={mapRef}
       initialViewState={viewPort} 
       style={{width: "100%", height: "50vh"}} 
       mapStyle="mapbox://styles/mapbox/streets-v11" 
       mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
       onViewPortChange={() => console.log(123)}
    >
      {/* Popup of marker */}
      {showPopup && (
        <Popup
          latitude={21.000274477955738}
          longitude={105.84253138495198}
          closeButton={true}
          closeOnClick={true}
          onClose={() => togglePopup(false)}
          anchor="top-right"
        >
          <div>Pop up marker</div>
        </Popup>
      )}
      <Marker
        latitude={21.000274477955738}
        longitude={105.84253138495198}
        // offsetLeft={-20}
        // offsetTop={-30}
      >
        <div onClick={() => togglePopup(true)}>
          <Room color="primary" fontSize="large"/>
        </div>
      </Marker>
      {/* <Marker
        latitude={21.000274477955738}
        longitude={105.84253138495198}
        offsetLeft={-20}
        offsetTop={-30}
      >
        <img
          style={{ height: 50, width: 50 }}
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
        />
      </Marker> */}
      <NavigationControl position="bottom-right" />
      <GeolocateControl 
        position='top-left' 
        trackUserLocation
        onGeolocate={(e) => console.log(e)}
      />
      {/* <Geocoder /> */}
    </MapGL >
  )
}

export default StepTwo
