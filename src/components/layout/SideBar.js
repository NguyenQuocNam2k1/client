import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';
import { Home, PostAdd, History, Image } from '@material-ui/icons';
import "~/assets/style/sidebar.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import ChipsSelect from './ChipsSelect';
import { listPlaceNew } from '../core/data';


export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
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
  const handleClickPage = (router) => {
    navigate(router);
  }
  return (
    <div className="sidebar">
      {/* List Page */}
      <List component="nav" aria-label="main mailbox folders">
        {listPage.map((page, index) => {
          return (
            <ListItem button key={index}
             className={`${page.active ? "active_menu" : ""}`}
             onClick = {() => handleClickPage(page.redirect)}
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
        <ListItem className="list_user_suggest">
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Quốc Nam" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
      <p className="text_show">Xem tất cả</p>

      <Divider />
      <List 
        component="nav" 
        aria-label="secondary mailbox folders"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" style={{fontSize:"14px", lineHeight:"40px"}}>
            Những người bạn đã đồng hành
          </ListSubheader>
        }
      >
        <ListItem className="list_user_suggest">
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Quốc Nam" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
      <p className="text_show">Xem thêm</p>

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
  );
}