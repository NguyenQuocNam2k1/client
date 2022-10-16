import React, { useState } from 'react';
import Test from "-cl/Header";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { publicRouters, privateRouter } from "-cr/index";
import GoogleMap from "-cp/GoogleMap/GoogleMap";
import Header from "-cl/Header";
import FormUser from "-cp/FormUser/FormUser";
import Theme from "-cp/Theme/Theme";
import LayoutContent from "-cl/LayoutContent";
import "~/assets/style/global.scss";


function App() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const location = useLocation();

  return (
    <React.Fragment>
      {isAuthenticate && location.pathname !== "/login" && location.pathname !== "/theme" && <Header />}
      <Routes> 
          {/* {publicRouters.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component}/>
            )
          })} */}
          <Route path="/login" element={<FormUser />}/>
          <Route path="/theme" element={<Theme />}/>

          {/* Check auth */}
          {
          !isAuthenticate
            ? <Route path="/" element={<Navigate replace to="/login" />} />
            : privateRouter.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={
                  <LayoutContent>
                    <Page />
                  </LayoutContent>
                }/>
              )
            })
        }
      </Routes> 
    </React.Fragment>
  )
}


export default App

