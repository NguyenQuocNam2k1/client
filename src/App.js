import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { publicRouters, privateRouter } from "-cr/index";
import FormUser from "-cp/FormUser/FormUser";
import Theme from "-cp/Theme/Theme";
import LayoutContent from "-cl/LayoutContent";
import LayoutCreate from '-cl/LayoutCreat';
import "~/assets/style/global.scss";
import GoogleMap from "-cp/GoogleMap/GoogleMap";
import ScrollTop from "-cl/ScrollTop";


function App() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const location = useLocation();

  return (
    <React.Fragment>
      <Routes> 
          {/* {publicRouters.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component}/>
            )
          })} */}
          {/* <Route path="/login" element={<FormUser />}/>
          <Route path="/theme" element={<Theme />}/> */}
          <Route path="/map" element={<GoogleMap />}/>
          {publicRouters.map((routerPublic, index) => {
            return (
              <Route key={index} path={routerPublic.path} element={routerPublic.component}/>
            )
          })}

          {/* Check auth */}
          {
          !isAuthenticate
            ? <Route path="/" element={<Navigate replace to="/login" />} />
            : privateRouter.map((route, index) => {
              const Page = route.component;
              let Layout = LayoutContent;
              if(location.pathname.includes("create") || location.pathname.includes("profile")){
                Layout = LayoutCreate;
              }
              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                }/>
              )
            })
        }
      </Routes>
      <ScrollTop />
    </React.Fragment>
  )
}


export default App

