/* eslint-disable no-undef */
import React, { useRef, useState } from "react";
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
  Badge,
  CircularProgress,
} from "@material-ui/core";
import {
  Person,
  Keyboard,
  Policy,
  Lock,
  Search,
  Notifications,
} from "@material-ui/icons/";
import "~/assets/style/header.scss";
import { useNavigate, Link } from "react-router-dom";
import { getSearch } from "~/redux/actions";
import Logo from "~/assets/image/avatar.webp";
import { useSelector } from "react-redux";
import { setCookie } from "-cc/cookie";


const listNoti = [
  { name: "Hí hí", content: "Không có content" },
  { name: "Hí hí", content: "Không có content" },
  { name: "Hí hí", content: "Không có content" },
  { name: "Hí hí", content: "Không có content" },
  { name: "Hí hí", content: "Không có content" },
];

function Header() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const [showResultSearch, setShowResultSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState("");
  const [showListNotification, setShowListNotification] = useState(false);
  const navigate = useNavigate();
  const timeRef = useRef(null);
  const { dataUser } = useSelector((state) => state.users);

  const listMenuAvatar = [
    {
      text: "Xem thông tin",
      icon: <Person fontSize="medium" />,
      navigate: `/profile/id=${dataUser._id}`,
    },
    {
      text: "Chuyến đi của bạn",
      icon: <Keyboard fontSize="medium" />,
      navigate: `/profile/id=${dataUser._id}`,
    },
    {
      text: "Chính sách, điều khoản",
      icon: <Policy fontSize="medium" />,
      divider: <Divider />,
      navigate: "/policy",
    },
    {
      text: "Đăng xuất",
      icon: <Lock fontSize="small" />,
      navigate: "/login",
    },
  ];

  const clickAvatar = () => {
    const listMenu = document.querySelector(".info-icon-item-list");
    listMenu.classList.toggle("show-list-menu");
    setShowListNotification(false);
  };

  const handleClickItem = (router, text) => {
    if(text === "Đăng xuất"){
      setCookie("CD_token", '');
    }
    navigate(router);
  };

  const handleClickIconNoti = () => {
    const listMenu = document.querySelector(".info-icon-item-list");
    listMenu.classList.remove("show-list-menu");
    setShowListNotification(!showListNotification);
  }

  const renderMenuInfo = () => {
    return (
      <React.Fragment>
        <div className="info-icon">
          {!isAuthenticate ? (
            <Button variant="contained" color="secondary">
              Đăng nhập
            </Button>
          ) : (
            <div className="info-icon-item">
              <Badge
                badgeContent={1}
                max={999}
                color="primary"
                children={<Notifications />}
                className="header_icon_noti"
                onClick = {() => handleClickIconNoti()}
              />
              {showListNotification && renderListNotification()}
              {/* Avatar sẽ để theo tên mặc định của người dùng. Background sẽ random */}
              <Avatar className="avatar" onClick={() => clickAvatar()}>
                Nam
              </Avatar>
              <Paper className="info-icon-item-list">
                <MenuList className="menu-list-header">
                  {listMenuAvatar.map((item, index) => {
                    return (
                      <div onClick={() => handleClickItem(item.navigate, item.text)}>
                        <MenuItem key={index}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText>{item.text}</ListItemText>
                        </MenuItem>
                        {item.divider}
                      </div>
                    );
                  })}
                </MenuList>
              </Paper>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  const renderResultSearch = () => {
    return (
      <React.Fragment>
        <div className="result-search">
          <p className="result-search-friend">Những người bạn</p>
          {resultSearch.listUserSearch.length === 0 && (
            <div className="result-search-not-found">
              Không tìm thấy người dùng phù hợp
            </div>
          )}
          {resultSearch &&
            resultSearch.listUserSearch.map((item, index) => {
              return (
                <div
                  className="result-search-item"
                  key={index}
                  onClick={() =>
                    handleClickValueSearch(`/profile/id=${item._id}`)
                  }
                >
                  <Search fontSize="small" className="result-search-icon" />
                  <p className="result-search-text">{item.name}</p>
                </div>
              );
            })}
          <Divider />
          <p className="result-search-trip">Những chuyến đi</p>
          {resultSearch.listTripSearch.length === 0 && (
            <div className="result-search-not-found">
              Không tìm thấy chuyến đi phù hợp
            </div>
          )}
          {resultSearch &&
            resultSearch.listTripSearch.map((item, index) => {
              return (
                <div
                  className="result-search-item"
                  key={index}
                  onClick={() =>
                    handleClickValueSearch(`/trips/id=${item._id}`)
                  }
                >
                  <Search fontSize="small" className="result-search-icon" />
                  <p className="result-search-text">{item.title}</p>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  };

  const renderListNotification = () => {
    return (
      <div className="list_noti">
        <p>Thông báo</p>
        <Divider />
        {listNoti.length && (
          <Paper className="info-noti-list">
            <MenuList>
              {listNoti.map((item, index) => {
                return (
                  <div>
                    <MenuItem key={index} className="notify-item">
                      <ListItemIcon>
                        <img
                          src={Logo}
                          className="img-notification"
                          alt="anh-notification"
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <div className="content-notification">
                          <p className="title-noti">
                            Đã đăng ký chuyến đi <b>Hà Nội - Hà Nam</b> của bạn 
                          </p>
                          <div className="btn-noti">
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item agree"
                            >
                              Chấp nhận
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item cancel"
                            >
                              Từ chối
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item info"
                            >
                              Xem thông tin
                            </Button>           
                          </div>
                        </div>
                      </ListItemText>
                    </MenuItem>
                  </div>
                );
              })}
            </MenuList>
          </Paper>
        )}
      </div>
    );
  };

  const fetchSearch = async (value) => {
    const params = {
      valueSearch: value,
    };
    const result = await getSearch(params);
    if (result) {
      setShowResultSearch(true);
      setResultSearch(result.data);
    }
    setIsLoading(false);
  };

  //function xu ly logic
  const handleClickValueSearch = (router) => {
    setValueSearch("");
    setShowResultSearch(false);
    window.location.replace(router);
  };

  const handleSearch = (value) => {
    setValueSearch(value);
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        fetchSearch(value);
      }, 1000);
    }, 1000);
  };

  return (
    <AppBar position="static" className="header">
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className="header-item"
      >
        <Grid item xs={3}>
          <Link to="/">
            <img
              src="https://danangaz.com/wp-content/uploads/2018/01/Untitled-1-01-300x129.png"
              className="logo"
              alt="logo"
            />
          </Link>
        </Grid>
        <Grid item xs={5}>
          <div className="header-search">
            <TextField
              id="filled-search"
              label="Tìm kiếm chuyến đi của bạn"
              type="search"
              variant="filled"
              value={valueSearch}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            ></TextField>
            {isLoading ? (
              <CircularProgress className="loading-search" />
            ) : (
              <SvgIcon component={Search} />
            )}
            {showResultSearch && renderResultSearch()}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="header-info">{renderMenuInfo()}</div>
        </Grid>
      </Grid>
      {/* </Toolbar> */}
    </AppBar>
  );
}

export default Header;
