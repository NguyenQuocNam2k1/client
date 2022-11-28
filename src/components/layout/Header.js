/* eslint-disable no-undef */
import React, { useRef, useState, useEffect, useCallback } from "react";
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
import { getSearch, getNotification, updateNotification, actFetchTotalNoti, actFetchListNoti } from "~/redux/actions";
import Logo from "~/assets/image/logo.webp";
import { useSelector, useDispatch } from "react-redux";
import { setCookie } from "-cc/cookie";
import Loading from "~/components/layout/Loading";
import NoData from "~/assets/image/nodata.webp";
import Modal from "./Modal";

function Header({socket}) {
  const dispatch = useDispatch();
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const [showResultSearch, setShowResultSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState("");
  const [showListNotification, setShowListNotification] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [indexNotiSelect, setIndexNotiSelect] = useState("");
  const navigate = useNavigate();
  const timeRef = useRef(null);
  const { dataUser } = useSelector((state) => state.users);
  const { listNotification, totalNotification } = useSelector((state) => state.pages);

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
    if (text === "Đăng xuất") {
      setCookie("CD_token", "");
    }
    if (text === "Xem thông tin"){
      window.location.replace(router);
    } else {
      navigate(router);
    }
  };

  const handleClickIconNoti = () => {
    const listMenu = document.querySelector(".info-icon-item-list");
    listMenu.classList.remove("show-list-menu");
    setShowListNotification(!showListNotification);

    let params = {
      type: "statusSeen",
      id_author: dataUser._id,
    }
    const resultUpdate = handleUpdateNotification(params);
    if(Number(resultUpdate.status) === 200){
      dispatch(actFetchTotalNoti(''));
    }
  };

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
                badgeContent={totalNotification}
                max={999}
                color="primary"
                children={<Notifications />}
                className="header_icon_noti"
                onClick={() => handleClickIconNoti()}
              />
              {showListNotification && renderListNotification()}
              {/* Avatar sẽ để theo tên mặc định của người dùng. Background sẽ random */}
              <Avatar
                className="avatar"
                src={dataUser.avatar.urlImage}
                onClick={() => clickAvatar()}
              ></Avatar>
              <Paper className="info-icon-item-list">
                <MenuList className="menu-list-header">
                  {listMenuAvatar.map((item, index) => {
                    return (
                      <div
                        onClick={() =>
                          handleClickItem(item.navigate, item.text)
                        }
                      >
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

  const handleClickItemNoti = (idNoti, indexNoti, button, infoTrip, idTrip, infoUser) => {
    const newList = [...listNotification];
    newList[indexNoti]['is_read'] = 1;

    let params = {
      type: "statusRead",
      id_notification: idNoti,
    }
    const response = handleUpdateNotification(params);

    if(Number(response.status) === 200){
      let status = 0;
      let newTripInfo = {...infoTrip};
      newTripInfo['member_number'] = Number(newTripInfo['member_number']) - 1;
      dispatch(actFetchListNoti(newList));
      if(button === "info"){
        setIndexNotiSelect(indexNoti);
        setShowModalRegister(!showModalRegister);
      }
      if(button === "access") status = 2;
      if(button === "cancel") status = 1;
      const dataUpdate = {
        idNoti: idNoti,
        status: status,
        newTripInfo,
        idTrip,
        infoUser
      }
      socket.emit("update_notification", dataUpdate)
    }
  }

  const handleUpdateNotification = async (params) => {
    const result = await updateNotification(params, dispatch);
    return result;
  }

  const renderListNotification = () => {
    return (
      <div className="list_noti">
        <p>Thông báo</p>
        <Divider />
        {listNotification.length ? (
          <Paper className="info-noti-list">
            <MenuList>
              {listNotification.map((item, index) => {
                let status = '';
                if(Number(item.status) === 1) status = 'thất bại';
                if(Number(item.status) === 2) status = 'thành công';
                return (
                  <div key={index}>
                  {
                    dataUser._id !== item.id_author ? 
                    <MenuItem className={`notify-item ${!item.is_read ? 'notify-item-active': ''}`}
                    >
                      <ListItemIcon>
                        <img
                          src={item.info_trip.imageTrip}
                          className="img-notification"
                          alt="anh-notification"
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <div className="content-notification">
                          <div className="title-noti">
                            {item.info_user.name} đã đăng ký chuyến đi <br/> <b>{item.info_trip.nameTrip}</b> của bạn
                          </div>
                          <div className="btn-noti">
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item agree"
                              onClick = {() => handleClickItemNoti(item._id, index, "access", item.info_trip, item.id_trip, item.info_user)}
                            >
                              Chấp nhận
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item cancel"
                              onClick = {() => handleClickItemNoti(item._id, index, "cancel", item.info_trip, item.id_trip, item.info_user)}
                            >
                              Từ chối
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-noti-item"
                              onClick = {() => handleClickItemNoti(item._id, index, "info", item.info_trip, item.id_trip, item.info_user)}
                            >
                              Xem thông tin
                            </Button>
                          </div> 
                        </div>
                      </ListItemText>

                      {/* Modal info register */}
                      <Modal
                        isShowModal={showModalRegister && indexNotiSelect === index}
                        handleShowModal={setShowModalRegister}
                        data={item}
                        title={`Thông tin của ${item.info_user.name}`}
                        type="infoRegister"
                      />
                    </MenuItem> 
                    : 
                    Number(item.status) !== 0 ?
                    <MenuItem  className={`notify-item ${!item.is_read ? 'notify-item-active': ''}`}
                    >
                      <ListItemIcon>
                        <img
                          src={item.info_trip.imageTrip}
                          className="img-notification"
                          alt="anh-notification"
                        />
                        <ListItemText>
                        <div className="content-notification">
                          <div className="title-noti">
                            Chuyến đi <b>{item.info_trip.nameTrip}</b> bạn đăng ký đã <b>{status}</b>
                          </div>
                        </div>
                      </ListItemText>
                      </ListItemIcon>
                    </MenuItem> : ""
                  }
                  </div>
                );
              })}
            </MenuList>
          </Paper>
        ) : <div className="page-no-data-noti">
          <img src={NoData} alt="anh-no-data" />
          <p>Bạn chưa có thông báo nào mới</p>
        </div>
        }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNotification = useCallback(() => {
    console.log(dataUser._id);
    const param = {
      id_author: dataUser._id,
    }
    dispatch(getNotification(param));
  })

  useEffect(() => {
    socket.on("receive_noti_register", (data) => {
      if(dataUser){
        fetchNotification();
      }
    });
    socket.on("receive_noti_update", (data) => {
      if(dataUser){
        fetchNotification();
      }
    });
  },[socket, dataUser, fetchNotification]);

  useEffect(() => {
    if(dataUser){
      fetchNotification();
    }
  }, [dataUser]);

  return (
    <AppBar position="static" className="header">
      {!dataUser ? (
        <Loading />
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className="header-item"
        >
          <Grid item xs={3}>
            <Link to="/">
              <img
                src={Logo}
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
      )}
      {/* </Toolbar> */}
    </AppBar>
  );
}

export default Header;
