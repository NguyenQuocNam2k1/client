import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import SideBar from './SideBar';
import Header from "./Header";

function LayoutCreate({ children, socket }) {
  return (
    <div className="layout-create">
      <Header socket={socket}/>
      <Grid container className="container-format" style={{marginTop:"30px"}}>
          <Grid item xs={12}>
              {children}
          </Grid>
      </Grid>
    </div>
  )
}

LayoutCreate.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutCreate
