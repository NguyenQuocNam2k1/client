import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL from 'react-map-gl';

//config
const apiKey = process.env.REACT_APP_GOGGLE_MAPS_BOX_API_KEY;
const initView = {
  latitude: 21.0244246,
  longitude: 105.7938072,
  zoom: 8
};

//function component
function GoogleMap() {
  const [viewPort, setViewPort] = useState(initView);

  return (
    <ReactMapGL 
       initialViewState={viewPort} 
       style={{width: "100vw", height: "100vh"}} 
       mapStyle="mapbox://styles/mapbox/streets-v11" 
       mapboxAccessToken ={apiKey}
       onViewPortChange={() => console.log(123)}
    >

    </ReactMapGL>
  );
}

export default GoogleMap;