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
  Divider,
  Badge
} from "@material-ui/core";
import { Person, Keyboard, Policy, Lock, Add, Search, Notifications} from '@material-ui/icons/';
import "~/assets/style/header.scss";
import { useNavigate, Link } from "react-router-dom";
// import LogoutIcon from '@material-ui/icons/Logout';

const listMenuAvatar = [
  {
    text:"Xem thông tin",
    icon:<Person fontSize="medium"/>,
    navigate:'/profile',
  },
  {
    text:"Chuyến đi của bạn",
    icon:<Keyboard fontSize="medium"/>,
    navigate:'/profile',
  },
  {
    text:"Chính sách, điều khoản",
    icon:<Policy fontSize="medium"/>,
    divider:<Divider/>,
    navigate:'/policy',
  },
  {
    text:"Đăng xuất",
    icon:<Lock fontSize="small"/>,
    navigate:'/login',
  },
];

function Header() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const navigate = useNavigate();
  
  const clickAvatar = () => {
    const listMenu = document.querySelector(".info-icon-item-list");
    listMenu.classList.toggle("show-list-menu");
  };
  const handleClickItem = (router) => {
    navigate(router);
  }

  const renderMenuInfo = () => {
    return (
      <React.Fragment>
        {/* <Button 
          onClick = {() => navigate("/create")}
          variant="contained" 
          mr="1rem" color="primary" startIcon={<Add />} 
          disableElevation
        >   
          Chuyến đi
        </Button> */}
        <Badge badgeContent={1000} max={999} color="primary" children={<Notifications />} />
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
                      <div onClick={() => handleClickItem(item.navigate)}>
                        <MenuItem key = {index}>
                          <ListItemIcon>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText>
                            {item.text}
                          </ListItemText>
                        </MenuItem>
                        {item.divider}
                      </div>
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
      >
        <Grid item xs={3}>
          <Link to="/">
            Logo
          </Link>
        </Grid>
        <Grid item xs={5}>
          <div className="header-search">
            <TextField
              id="filled-search"
              label="Tìm kiếm chuyến đi của bạn"
              type="search"
              variant="filled"
            ></TextField>
            <SvgIcon component={Search} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="header-info">
            {renderMenuInfo()}
          </div>
        </Grid>
      </Grid>
      {/* </Toolbar> */}
    </AppBar>
  );
}

export default Header;
