import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Grid, Divider , Avatar, IconButton, Typography, Tooltip } from '@material-ui/core';
import { MoreVert, ThumbUp, AddCircle, Share } from '@material-ui/icons';
import "~/assets/style/homePage.scss";
import { getTrips , actFetchUserInfo} from "~/redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/layout/Loading';
import moment from  "moment";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: "16px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { listTrip } = useSelector((state) => state.pages);
  const { dataUser } = useSelector((state) => state.users);

  //function logic
  const handleClickLike = (postId) => {
    const newUser = dataUser;
    const listPostNew = newUser['list_post_trip_like'];
    console.log(listPostNew)
    if(listPostNew.includes(postId)){
      console.log(1);
      newUser['list_post_trip_like'] = listPostNew.filter(function(value, index, arr){
        return value !== postId;
      });
    } else {
      console.log(2);
      newUser['list_post_trip_like'] = listPostNew.push(postId);
    }
    console.log(newUser);
    // let params = {
    //   data: 
    // }
    // dispatch(actFetchUserInfo())
  }

  useEffect(() => {
    dispatch(getTrips());
  },[])

  return (
    <>
      {
      !listTrip ? <Loading /> : 
        <div className="home-page">
          {listTrip.map((trip, key) => {
            const authorInfo = JSON.parse(`${trip.author_info}`);
            const listPostLike = dataUser.list_post_trip_like;
            return (
              <div key={key}>
                <Grid className="home-page-item">
                  <Card className="card-home">
                    <CardHeader
                      className="card-home-header"
                      avatar={
                        <Avatar aria-label="recipe" src={authorInfo.avatar} alt={key}/>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVert />
                        </IconButton>
                      }
                      title={authorInfo.name}
                      subheader={moment(trip.update_at, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD-MM-YYYY")}
                    />
                    <Grid item xs={10}>
                      <Typography variant="body2" className="description-card three_dot" color="textSecondary" component="p">
                          {trip.rule}
                      </Typography>
                      <Typography variant="body2" className="hagtask-card" color="textSecondary" component="p">
                         {trip.hashtask}
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Grid item xs={8}>
                        <CardMedia
                          className={classes.media}
                          image={trip.url_image}
                          title="Paella dish"
                        />
                      </Grid>
                      <Grid item xs={1} className="icon-card">
                        <div className="icon-card-item">
                          <Tooltip title="Thích" placement="right" onClick = {() => handleClickLike(trip._id)}>
                            <IconButton aria-label="settings" className={`${listPostLike.includes(trip._id) ? "icon_like" :""}`}>
                              <ThumbUp />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Tham gia" placement="right">
                            <IconButton aria-label="settings">
                              <AddCircle />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Chia sẻ" placement="right">
                            <IconButton aria-label="settings">
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Divider/>
              </div>
            )
          })}
        </div>
      }
   </>
  );
}

export default Home;