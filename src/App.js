import logo from './logo.svg';
import './App.css';
import ReactMapGL from  "react-map-gl";
import { useState } from 'react';

let positionDefault = {
      width: "100vw",
      height: "100vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16
};
function App() {
  const [positionCurrent, setPosition] = useState(positionDefault);
  console.log(process.env.REACT_APP_GOGGLE_MAPS_BOX_API_KEY);
  return (
    // <div className="App-content">
    //   <ReactMapGL 
    //       {...positionCurrent} 
    //       mapStyle="mapbox://styles/mapbox/streets-v9" 
    //       mapboxApiAccessToken="k.eyJ1IjoibmFtbmV1IiwiYSI6ImNsOHluNGU3ODBpOGQzb3BjZTN3MWZqdTUifQ.U-cHwjNXzRCbxyY946ugdg"
    //       // onViewportChange={(position) => setPosition(position)}
    //   />
    // </div>
  );
}

export default App;
