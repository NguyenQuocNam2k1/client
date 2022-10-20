import React, {useState} from 'react';
import { Card, Grid, Divider , Avatar, IconButton, Typography, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { MoreVert, Favorite, Comment, RateReview, Person } from '@material-ui/icons';
import "~/assets/style/profile.scss";
import AvatarFake from '~/assets/image/avatar.jpg';

function Profile(props) {
  return (
    <div className="profile">
      <Grid className="profile-layout" spacing={3}>
        <Grid xs={3}>
          <Card className="profile_title">
            <Avatar alt="Remy Sharp" src={AvatarFake} />
            <p className="name-profile">Nguyễn Quốc Nam</p>
          </Card>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Card className="card-item">
              <p>Giới thiệu</p>
              <div className="card-item-content"><Person /> Là thành viên từ: <b> 1 tháng trước</b></div>
              <div className="card-item-content"><RateReview /> Luợt đánh giá: <b> 1000 luợt</b></div>
              <Rating name="size-large" defaultValue={2} size="large" readOnly className="rate" />
            </Card>
            <Card className="card-item">
              <p>Thông tin cá nhân</p>
              <div className="card-item-content"><Person /> Là thành viên từ: <b> 1 tháng trước</b></div>
              <div className="card-item-content"><RateReview /> Luợt đánh giá: <b> 1000 luợt</b></div>
              <Rating name="size-large" defaultValue={2} size="large" readOnly className="rate" />
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card className="card-item">
              <p>Những chuyến đi gần đây</p>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}


export default Profile;
