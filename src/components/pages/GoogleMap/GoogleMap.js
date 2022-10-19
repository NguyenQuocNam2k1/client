/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

//config
const apiKey = process.env.REACT_APP_GOGGLE_MAPS_BOX_API_KEY;
const initView = {
  latitude: 21.000274477955738,
  longitude: 105.84253138495198,
  zoom: 16
};
//21.000274477955738, 105.84253138495198

function StepTwo(props) {
  const [viewPort, setViewPort] = useState(initView);
  const [showPopup, togglePopup] = useState(false);
  return (
    <ReactMapGL 
       initialViewState={viewPort} 
       style={{width: "100vw", height: "100vh"}} 
       mapStyle="mapbox://styles/mapbox/streets-v11" 
       mapboxAccessToken="pk.eyJ1IjoibmFtbmV1IiwiYSI6ImNsOWNwcWdpODEyeWozbnBpYTI4eGNsbXoifQ.cvN5uKeXtGlhQBwxX6O5Xg"
       onViewPortChange={() => console.log(123)}
    >
      <Marker
        latitude={21.000274477955738}
        longitude={105.84253138495198}
        // offsetLeft={-20}
        // offsetTop={-30}
      >
        <img
          style={{ height: 50, width: 50 }}
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
        />
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
    </ReactMapGL>
  )
}

export default StepTwo
