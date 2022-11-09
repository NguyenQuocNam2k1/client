import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import SideBar from './SideBar';
import Header from "./Header";

function LayoutContent({ children }) {
  return (
    <>
      <Header />
      <Grid container spacing={3} className="container-format" style={{marginTop:"30px"}}>
          <Grid item xs={3}>
              <SideBar />
          </Grid>
          <Grid item xs={8}>
              {children}
          </Grid>
      </Grid>
    </>
  )
}

LayoutContent.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutContent
