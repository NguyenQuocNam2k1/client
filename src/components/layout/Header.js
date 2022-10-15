import React, { useState } from "react";
import {
  Grid,
  AppBar,
  TextField,
  SvgIcon,
  Button,
  Avatar,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Person, History, Policy, ExitToAppIcon, Add, Search} from '@material-ui/icons/';
import "~/assets/style/header.scss";
// import LogoutIcon from '@material-ui/icons/Logout';

const listMenuAvatar = [
  {
    text:"Xem thông tin",
    icon:<Person fontSize="medium"/>,
  },
  {
    text:"Các chuyển đi",
    icon:<History fontSize="medium"/>
  },
  {
    text:"Chính sách, điều khoản",
    icon:<Policy fontSize="medium"/>
  },
  // {
  //   text:"Đăng xuất",
  //   icon:<LogoutIcon fontSize="small"/>
  // },
];

const clickAvatar = () => {
  const listMenu = document.querySelector(".info-icon-item-list");
  listMenu.classList.toggle("show");
}
function Header() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);

  const menuInfo = () => {
    return (
      <React.Fragment>
        <Button variant="contained" mr="1rem" color="primary" startIcon={<Add />} disableElevation>
          Chuyến đi
        </Button>
        <div className="info-icon">
          {!isAuthenticate ? (
            <Button variant="contained" color="secondary">
              Đăng nhập
            </Button>
          ) : (
            <div className="info-icon-item">
              {/* Avatar sẽ để theo tên mặc định của người dùng. Background sẽ random */}
              <Avatar className="avatar" onClick = {() => clickAvatar()}>
                Nam
              </Avatar>
              <Paper className="info-icon-item-list">
              <MenuList className="menu-list-header">
                {listMenuAvatar.map((item, index) => {
                  return(
                    <MenuItem key = {index}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>
                        {item.text}
                      </ListItemText>
                    </MenuItem>
                  )
                })}
                </MenuList>
            </Paper>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <AppBar position="static" className="header">
      {/* <Toolbar className="container-format"> */}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className="header-item"
        spacing="5"
      >
        <Grid item xs={3}>
          Logo
        </Grid>
        <Grid item xs={5}>
          <div className="header-search">
            <TextField
              id="filled-search"
              label="Tìm kiếm chuyến đi của bạn"
              type="search"
              variant="filled"
              onAnimationStart="none"
            ></TextField>
            <SvgIcon component={Search} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="header-info">
            {menuInfo()}
          </div>
        </Grid>
      </Grid>
      {/* </Toolbar> */}
    </AppBar>
  );
}

export default Header;
