import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Grid, Divider , Avatar, IconButton, Typography, Tooltip } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { MoreVert, Favorite, Comment, Share } from '@material-ui/icons';
import "~/assets/style/homePage.scss";
import Blog from "~/assets/image/home_page/homePage3.jpg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: "16px",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="home-page">
      <Grid container className="home-page-item">
        <Card className="card-home">
          <CardHeader
            className="card-home-header"
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title="Nguyễn Quốc Nam"
            subheader="16/10/2022"
          />
          <Grid item xs={10}>
            <Typography variant="body2" className="description-card" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <Typography variant="body2" className="hagtask-card" color="textSecondary" component="p">
                #abc #def
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <CardMedia
                className={classes.media}
                image={Blog}
                title="Paella dish"
              />
            </Grid>
            <Grid item xs={1} className="icon-card">
              <div className="icon-card-item">
                <Tooltip title="Thích" placement="right">
                  <IconButton aria-label="settings">
                    <Favorite />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bình luận" placement="right">
                  <IconButton aria-label="settings">
                    <Comment />
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
  );
}

export default Home;