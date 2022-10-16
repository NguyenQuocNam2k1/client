import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { publicRouters, privateRouter } from "-cr/index";
import FormUser from "-cp/FormUser/FormUser";
import Theme from "-cp/Theme/Theme";
import LayoutContent from "-cl/LayoutContent";
import LayoutCreate from '-cl/LayoutCreat';
import "~/assets/style/global.scss";


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
          <Route path="/login" element={<FormUser />}/>
          <Route path="/theme" element={<Theme />}/>

          {/* Check auth */}
          {
          !isAuthenticate
            ? <Route path="/" element={<Navigate replace to="/login" />} />
            : privateRouter.map((route, index) => {
              const Page = route.component;
              let Layout = LayoutContent;
              if(location.pathname.includes("create")){
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

    </React.Fragment>
  )
}


export default App

