import React, { useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader, ListItemAvatar, Avatar, CircularProgress } from '@material-ui/core';
import { Home, PostAdd, History, Image } from '@material-ui/icons';
import "~/assets/style/sidebar.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import ChipsSelect from './ChipsSelect';
import { listPlaceNew } from '../core/data';
import { getUsers, getPosts } from "~/redux/actions"; 
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";


export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {dataUser} = useSelector((state) => state.users);
  const { listUserSuggest} = useSelector((state) => state.pages);
  const dispatch = useDispatch();
  
  
  const listPage = [
    {
      name:"Dành cho bạn",
      icon:<Home fontSize="large" />,
      active: location.pathname === "/",
      redirect:"/",
    },
    {
      name:"Tạo chuyến đi",
      icon:<PostAdd fontSize="large" />,
      active: location.pathname.includes("create"),
      redirect:"/create",
    },
    {
      name:"Lịch sử chuyến đi",
      icon:<History fontSize="large" />,
      active: location.pathname.includes("history"),
      redirect:"/history",
    },
  ]; 
  //xu ly logic
  const handleClickItem = (router) => {
    navigate(router);
  };

  //useEffect
  useEffect(() => {
    if(!dataUser) return;
    const params = {
      email : dataUser.email
    }
    dispatch(getUsers(params));
  },[dataUser]);

  return (
    <>
    {
     !listUserSuggest ? <CircularProgress  /> : 
      <div className="sidebar">
        {/* List Page */}
        <List component="nav" aria-label="main mailbox folders">
          {listPage.map((page, index) => {
            return (
              <ListItem button key={index}
              className={`${page.active ? "active_menu" : ""}`}
              onClick = {() => handleClickItem(page.redirect)}
              >
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            )
          })}
        </List>

        <Divider />
        <List 
          component="nav" 
          aria-label="secondary mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" style={{fontSize:"14px", lineHeight:"40px"}}>
              Những tài khoản được đề xuất
            </ListSubheader>
          }
        >
          {listUserSuggest.map((user, index) => {
            return (
            <ListItem className="list_user_suggest" key={index} onClick = {() => handleClickItem(`/profile/id=${user._id}`)}>
              <ListItemAvatar>
                <Avatar src={user.avatar} alt="avatar_user.email" />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={moment(user.create_at, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD-MM-YYYY")} />
            </ListItem>
            )
          })}
        </List>
        <p className="text_show">Xem tất cả</p>

        {/* <Divider />
        <List 
          component="nav" 
          aria-label="secondary mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" style={{fontSize:"14px", lineHeight:"40px"}}>
              Những người bạn đã đồng hành
            </ListSubheader>
          }
        >
          {listUserOld.map((user, index) => {
            console.log(user);
            return (
            <ListItem className="list_user_suggest" key={index} onClick = {() => handleClickItem(`/profile/id=${user._id}`)}>
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name_user} secondary={moment(user.create_at, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD-MM-YYYY")} />
            </ListItem>
            )
          })}
        </List>
        <p className="text_show">Xem thêm</p> */}

        <Divider />
        <List 
          component="nav" 
          aria-label="secondary mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" style={{fontSize:"14px", lineHeight:"40px"}}>
              Khám phá những địa điểm mới
            </ListSubheader>
          }
        >
          <ChipsSelect chips={listPlaceNew}/>
        </List>
      </div>
    }
    </>
  );
}