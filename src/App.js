import React from 'react';
import Test from "-cl/Header";
import { Routes, Route, Link } from "react-router-dom";
import { publicRouters } from "-cr/index";

function App(props) {
  return (
    <Routes>
        {publicRouters.map((route, index) => {
          console.log(route);
          return (
            <Route key={index} path={route.path} element={route.component}/>
            // <Route key={index} path="/" element={<Test />} />

          )
        })}
        {/* <Route path="/" element={<Test />} />
        <Route path="about" element={<Test />} /> */}
    </Routes>
  )
}


export default App

