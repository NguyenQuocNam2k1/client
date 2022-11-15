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
import {
  MoreVert,
  ThumbUp,
  AddCircle,
  Share,
  Subtitles,
} from "@material-ui/icons";
import "~/assets/style/homePage.scss";
import {
  getTrips,
  actFetchUserInfo,
  updateUserInfo,
  actFetchNewTrip,
} from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/components/layout/Loading";
import moment from "moment";
import Modal from "~/components/layout/Modal";
import NotData from "~/components/layout/NotData";

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

const Home = ({ socket }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalRegister, setIsShowModalRegister] = useState(false);
  const [tripLink, setTripLink] = useState("");
  const { listTrip } = useSelector((state) => state.pages);
  const { dataUser } = useSelector((state) => state.users);

  const handleClickLike = async (postId, indexTrip) => {
    const newUser = dataUser;
    const listPostNew = newUser["list_post_trip_like"];
    const newTrip = { ...listTrip };
    let countLikeTrip = newTrip[indexTrip]["count_like"];
    if (listPostNew.includes(postId)) {
      newUser["list_post_trip_like"] = listPostNew.filter(function (
        value,
        index,
        arr
      ) {
        return value !== postId;
      });
      countLikeTrip -= 1;
    } else {
      listPostNew.push(postId);
      newUser["list_post_trip_like"] = listPostNew;
      countLikeTrip += 1;
    }

    //dispatch user
    let params = {
      data: newUser,
    };
    dispatch(actFetchUserInfo(params));
    //dispatch trip
    newTrip[indexTrip]["count_like"] = countLikeTrip;
    params = {
      data: newTrip,
    };
    dispatch(actFetchNewTrip(params));

    params = {
      email: newUser["email"],
      list_post_trip_like: newUser["list_post_trip_like"],
      avatar: newUser["avatar"],
      count_like: countLikeTrip,
      idTrip: postId,
    };
    await updateUserInfo(params);
  };

  const handleClickRegister = (idTrip) => {
    setTripLink(idTrip);
    setIsShowModalRegister(true);
  };
  const handleClickShareLink = (idTrip) => {
    setTripLink(idTrip);
    setIsShowModal(!isShowModal);
  };


  useEffect(() => {
    dispatch(getTrips());
  }, []);

  return (
    <>
      {!listTrip || !dataUser ? (
        <Loading />
      ) : (
        <>
          {listTrip.length === 0 ? (
            <NotData content="Không tìm thấy chuyến đi nào phù hợp" />
          ) : (
            <div className="home-page">
              {listTrip.map((trip, key) => {
                const authorInfo = JSON.parse(`${trip.author_info}`);
                const urlImage = JSON.parse(trip.url_image).urlImage;
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
                              src={authorInfo.avatar.urlImage}
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
                          ).format("DD-MM-YYYY HH:mm:ss")}
                        />
                        <Grid item xs={11}>
                          <Typography
                            variant="body2"
                            className="title-card"
                            color="textSecondary"
                            component="p"
                          >
                            <Subtitles />
                            {trip.title}
                          </Typography>
                          <div className="trip-info-header">
                            <Typography
                              variant="body2"
                              className="description-card three_dot"
                              color="textSecondary"
                              component="p"
                            >
                              <b style={{ color: "black" }}>Thời gian: </b>
                              {moment(
                                trip.start_at,
                                "YYYY-MM-DDTHH:mm:ss.SSS"
                              ).format("DD-MM-YYYY HH:mm:ss")}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="description-card three_dot"
                              color="textSecondary"
                              component="p"
                            >
                              <b style={{ color: "black" }}>
                                Số chỗ còn trống:{" "}
                              </b>
                              {trip.number_member}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="description-card three_dot"
                              color="textSecondary"
                              component="p"
                            >
                              <b style={{ color: "black" }}>
                                Chi phí chuyến đi /1 người:{" "}
                              </b>
                              {Number(trip.cost) === 0 ? "Miễn phí" : `${trip.cost} VNĐ`}
                            </Typography>
                          </div>
                          <div className="trip-info">
                            <Typography
                              variant="body2"
                              className="description-card three_dot"
                              color="textSecondary"
                              component="p"
                            >
                              <b style={{ color: "black" }}>Điểm xuất phát: </b>
                              {trip.start_place}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="description-card three_dot"
                              color="textSecondary"
                              component="p"
                            >
                              <b style={{ color: "black" }}>Điểm đến: </b>
                              {trip.end_place}
                            </Typography>
                          </div>
                          <Typography
                            variant="body2"
                            className="description-card three_dot"
                            color="textSecondary"
                            component="p"
                          >
                            <b style={{ color: "black" }}>Yêu cầu: </b>
                            {trip.rules}
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
                              image={urlImage.replace("\\","/")}
                              title="Paella dish"
                            />
                          </Grid>

                          <Grid item xs={1} className="icon-card">
                            <div className="icon-card-item">
                              <Tooltip
                                title={`${
                                  !trip.count_like ? 0 : trip.count_like
                                } luợt thích`}
                                placement="right"
                                onClick={() => handleClickLike(trip._id, key)}
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
                                  onClick={() => handleClickRegister(trip._id)}
                                >
                                  <AddCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title="Chia sẻ chuyến đi"
                                placement="right"
                              >
                                <IconButton
                                  aria-label="settings"
                                  onClick={() => handleClickShareLink(trip._id)}
                                >
                                  <Share />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Grid>
                        </Grid>
                      </Card>
                      {/* {tripLink === trip._id &&  */}
                      <Modal
                        isShowModal={isShowModal && tripLink === trip._id}
                        handleShowModal={setIsShowModal}
                        data={trip._id}
                        title="Chia sẻ chuyến đi với người khác"
                        type="get_link"
                      />
                      {/* } */}

                      {/* modal điền thông tin */}
                      <Modal
                        isShowModal={isShowModalRegister && tripLink === trip._id}
                        handleShowModal={setIsShowModalRegister}
                        title="Giới thiệu về bản thân"
                        type="register_trip"
                        data={trip}
                        socket={socket}
                      />
                    </Grid>
                    <Divider />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
