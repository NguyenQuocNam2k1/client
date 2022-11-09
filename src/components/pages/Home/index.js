import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Divider,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { MoreVert, ThumbUp, AddCircle, Share } from "@material-ui/icons";
import "~/assets/style/homePage.scss";
import { getTrips, actFetchUserInfo, updateUserInfo } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/components/layout/Loading";
import moment from "moment";
import Modal from "~/components/layout/Modal";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "16px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalRegister, setIsShowModalRegister] = useState(false);
  const [tripInfo, setTripInfo] = useState();
  const { listTrip } = useSelector((state) => state.pages);
  const { dataUser } = useSelector((state) => state.users);


  const handleClickLike = async (postId) => {
    const newUser = dataUser;
    const listPostNew = newUser["list_post_trip_like"];
    if (listPostNew.includes(postId)) {
      newUser["list_post_trip_like"] = listPostNew.filter(function (
        value,
        index,
        arr
      ) {
        return value !== postId;
      });
    } else {
      listPostNew.push(postId);
      newUser["list_post_trip_like"] = listPostNew;
    }
    let params = {
      data: newUser,
    };
    dispatch(actFetchUserInfo(params));

    params = {
      email: newUser["email"],
      list_post_trip_like: newUser["list_post_trip_like"],
      avatar: newUser["avatar"],
    };
    await updateUserInfo(params);
  };

  const handleClickRegister = (data) => {
    setIsShowModalRegister(true);
    setTripInfo(data);
  }
  useEffect(() => {
    dispatch(getTrips());
  }, []);

  return (
    <>
      {!listTrip || !dataUser ? (
        <Loading />
      ) : (
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
                        <Avatar
                          aria-label="recipe"
                          src={authorInfo.avatar}
                          alt={key}
                        />
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVert />
                        </IconButton>
                      }
                      title={authorInfo.name}
                      subheader={moment(
                        trip.update_at,
                        "YYYY-MM-DDTHH:mm:ss.SSS"
                      ).format("DD-MM-YYYY")}
                    />
                    <Grid item xs={10}>
                      <Typography
                        variant="body2"
                        className="description-card three_dot"
                        color="textSecondary"
                        component="p"
                      >
                        {trip.rule}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="hagtask-card"
                        color="textSecondary"
                        component="p"
                      >
                        {trip.hashtags}
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
                          <Tooltip
                            title={`${
                              listPostLike.includes(trip._id)
                                ? "Bỏ thích"
                                : "Thích"
                            }`}
                            placement="right"
                            onClick={() => handleClickLike(trip._id)}
                          >
                            <IconButton
                              aria-label="settings"
                              className={`${
                                listPostLike.includes(trip._id)
                                  ? "icon_like"
                                  : ""
                              }`}
                            >
                              <ThumbUp />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Tham gia"
                            placement="right"
                          >
                            <IconButton aria-label="settings" onClick={() => handleClickRegister(trip)}>
                              <AddCircle />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Chia sẻ" placement="right">
                            <IconButton
                              aria-label="settings"
                              onClick={() => setIsShowModal(true)}
                            >
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Divider />
              </div>
            );
          })}
          <Modal
            isShowModal={isShowModal}
            handleShowModal={setIsShowModal}
            title="Chia sẻ chuyến đi với người khác"
            type="get_link"
          />

          {/* modal điền thông tin */}
          <Modal
            isShowModal={isShowModalRegister}
            handleShowModal={setIsShowModalRegister}
            title="Điền thông tin chuyến đi"
            type="register_trip"
          />
        </div>
      )}
    </>
  );
};

export default Home;
