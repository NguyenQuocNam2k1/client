import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { publicRouters, privateRouter } from "-cr/index";
import LayoutContent from "-cl/LayoutContent";
import LayoutCreate from '-cl/LayoutCreat';
import "~/assets/style/global.scss";
import GoogleMap from "-cp/GoogleMap/GoogleMap";
import { getCookie } from "-cc/cookie";
import ScrollTop from "-cl/ScrollTop";
import { getUser } from "~/redux/actions";
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const [isAuthenticate, setIsAuThenticate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  const getUserInfo = (email) => {
    dispatch(getUser({email}));
  }

  useEffect(() => {
    const auth = getCookie("CD_token");
    setIsAuThenticate(auth ? true : false);
    if(!auth) {
      navigate("/login")
    } else {
      const email = getCookie("CD_email");
      getUserInfo(email);
    }
  },[token]);
  return (
    <React.Fragment>
      <Routes> 
          <Route path="/map" element={<GoogleMap />}/>
          {publicRouters.map((routerPublic, index) => {
            return (
              <Route key={index} path={routerPublic.path} element={routerPublic.component}/>
            )
          })}

          {/* Check auth */}
          {isAuthenticate && privateRouter.map((route, index) => {
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

