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
  CircularProgress 
} from "@material-ui/core";
import { Person, Keyboard, Policy, Lock, Add, Search, Notifications} from '@material-ui/icons/';
import "~/assets/style/header.scss";
import { useNavigate, Link } from "react-router-dom";
import { getSearch } from "~/redux/actions";
import { useDispatch } from "react-redux";

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

const listNoti = [
  {name:"Hí hí", content:"Không có content"},
  {name:"Hí hí", content:"Không có content"},
  {name:"Hí hí", content:"Không có content"},
  {name:"Hí hí", content:"Không có content"},
  {name:"Hí hí", content:"Không có content"},
]

function Header() {
  const [isAuthenticate, setIsAuThenticate] = useState(true);
  const [showResultSearch, setShowResultSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState("");
  const navigate = useNavigate();
  const timeRef = useRef(null);
  const dispatch = useDispatch();
  
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
        <div className="info-icon">
          {!isAuthenticate ? (
            <Button variant="contained" color="secondary">
              Đăng nhập
            </Button>
          ) : (
            <div className="info-icon-item">
              <Badge badgeContent={1} max={999} color="primary" children={<Notifications />} className="header_icon_noti" />
              {/* {renderListNotification()} */}
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

  const renderResultSearch = () => {
    return (
      <React.Fragment>
        <div className="result-search">
          <p className="result-search-friend">Những người bạn</p>
          {resultSearch && resultSearch.listUserSearch.map((item, index) => {
            return (
              <div className="result-search-item" key={index}>
                  <Search fontSize="small" className="result-search-icon"/>
                  <p className="result-search-text">{item.name}</p>
              </div>
            )
          })}
          <Divider />
          <p className="result-search-trip">Những chuyến đi</p>
          {resultSearch && resultSearch.listTripSearch.map((item, index) => {
            return (
              <div className="result-search-item" key={index}>
                  <Search fontSize="small" className="result-search-icon"/>
                  <p className="result-search-text">{item.title}</p>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  };

  const renderListNotification = () => {
    return (
      <div className="list_noti">
        <p>Thông báo</p>
        <Divider />
        {listNoti.length && 
          <div className="list_noi-item">
            <Grid container>
              <Grid item xs={2}>
                <Avatar className="avatar">
                  Nam
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <p>Nguyễn Quốc Nam</p>
              </Grid>
            </Grid>
          </div>
        }
      </div>
    )
  }

  const fetchSearch = async (value) => {
    const params = {
      valueSearch : value
    }
    const result = await getSearch(params);
    if(result) {
      setShowResultSearch(true);
      setResultSearch(result.data);
    };
    setIsLoading(false);
  }

  //function xu ly logic
  const handleSearch =  (value) => {
    setValueSearch(value);
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        fetchSearch(value);
      }, 1000)
    }, 1000);
    // if(!value){
    //   return setShowResultSearch(false);
    // }
    // setShowResultSearch(true);
  }
  const handleBlurSearch = () => {
    setValueSearch('');
    setShowResultSearch(false);
  }
  const handleKeyDown = (e) => {
    if(e.keyCode === 14)
    console.log(123);
  }

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
              value={valueSearch}
              onChange={(e) => {handleSearch(e.target.value)}}
              onBlur= {() => handleBlurSearch()}
              onKeyDown = {(e) => handleKeyDown(e)}
            ></TextField>
            {isLoading ? <CircularProgress className="loading-search"/> : <SvgIcon component={Search} />}
            {showResultSearch && renderResultSearch()}
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
