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
import { getTripsById, actFetchUserInfo, updateUserInfo } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/components/layout/Loading";
import moment from "moment";
import Modal from "~/components/layout/Modal";
import { useParams } from "react-router-dom";

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
  const { slug } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const idTrip = slug.slice(3);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalRegister, setIsShowModalRegister] = useState(false);
  const [tripInfo, setTripInfo] = useState();
  const { resultTripSeach } = useSelector((state) => state.pages);
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
  };
  useEffect(() => {
    if(idTrip){
      const params = {
        "_id": idTrip,
      }
      dispatch(getTripsById(params));
    }
  }, [dispatch, idTrip]);

  return (
    <>
      {!resultTripSeach || !dataUser ? (
        <Loading />
      ) : (
        <div className="home-page">
          {resultTripSeach.map((trip, key) => {
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
                      <div className="content-card-trip">
                        <Typography
                          variant="body2"
                          className="description-card filed-card three_dot"
                          color="textSecondary"
                          component="p"
                        >
                          Tiêu đề:
                        </Typography>
                        <Typography
                          variant="body2"
                          className="description-card three_dot"
                          style={{ marginLeft: "4px !important" }}
                          color="textSecondary"
                          component="p"
                        >
                          {trip.title}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="content-card-trip">
                          <Typography
                            variant="body2"
                            className="description-card filed-card three_dot"
                            color="textSecondary"
                            component="p"
                          >
                            Thời gian:
                          </Typography>
                          <Typography
                            variant="body2"
                            className="description-card three_dot"
                            style={{ marginLeft: "4px !important" }}
                            color="textSecondary"
                            component="p"
                          >
                            {moment(trip.start_at, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD-MM-YYYY")}
                          </Typography>
                        </div>
                        <div className="content-card-trip">
                          <Typography
                            variant="body2"
                            className="description-card filed-card three_dot"
                            color="textSecondary"
                            component="p"
                          >
                            Điểm đi:
                          </Typography>
                          <Typography
                            variant="body2"
                            className="description-card three_dot"
                            style={{ marginLeft: "4px !important" }}
                            color="textSecondary"
                            component="p"
                          >
                            {trip.start_at}
                          </Typography>
                        </div>
                        <div className="content-card-trip">
                          <Typography
                            variant="body2"
                            className="description-card filed-card three_dot"
                            color="textSecondary"
                            component="p"
                          >
                            Điểm đến:
                          </Typography>
                          <Typography
                            variant="body2"
                            className="description-card three_dot"
                            style={{ marginLeft: "4px !important" }}
                            color="textSecondary"
                            component="p"
                          >
                            {trip.start_at}
                          </Typography>
                        </div>
                      </div>
                      <div className="content-card-trip">
                        <Typography
                          variant="body2"
                          className="description-card filed-card three_dot"
                          color="textSecondary"
                          component="p"
                        >
                          Yêu cầu:
                        </Typography>
                        <Typography
                          variant="body2"
                          className="description-card three_dot"
                          style={{ marginLeft: "4px !important" }}
                          color="textSecondary"
                          component="p"
                        >
                          {trip.rule}
                        </Typography>
                      </div>
                      <div className="content-card-trip">
                        <Typography
                          variant="body2"
                          className="description-card filed-card three_dot"
                          color="textSecondary"
                          component="p"
                        >
                          Hashtag:
                        </Typography>
                        <Typography
                          variant="body2"
                          className="description-card hagtask-card"
                          color="textSecondary"
                          component="p"
                        >
                          {trip.hashtags}
                        </Typography>
                      </div>
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
                          <Tooltip title="Tham gia" placement="right">
                            <IconButton
                              aria-label="settings"
                              onClick={() => handleClickRegister(trip)}
                            >
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
