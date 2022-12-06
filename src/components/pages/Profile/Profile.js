import React, { useEffect, useState } from "react";
import { Card, Grid, Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  RateReview,
  Person,
  Edit,
  Email,
  ContactPhone,
  Accessibility,
  FiberManualRecord,
} from "@material-ui/icons";
import "~/assets/style/profile.scss";
import { useDispatch, useSelector } from "react-redux";
import Modal from "~/components/layout/Modal";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "~/components/layout/Loading";
import { getUserById, getTripHistory, getTripCreated } from "~/redux/actions";
import NotData from "~/components/layout/NotData";

function Profile(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const idUser = slug.slice(3);
  const [sex, setSex] = useState("");
  const { listTripHistory } = useSelector((state) => state.pages);
  const { userInfo, dataUser, listTripCreated } = useSelector((state) => state.users);

  useEffect(() => {
    switch (userInfo.sex) {
      case "female":
        setSex("Nữ");
        break;
      case "male":
        setSex("Nam");
        break;
      default:
        setSex("Không xác định");
        break;
    }
  }, [userInfo]);

  useEffect(() => {
    const params = {
      _id: idUser,
    };
    dispatch(getUserById(params));
    dispatch(getTripCreated(params));
  }, []);

  useEffect(() => {
    if (userInfo) {
      const params = {
        name_user: userInfo.name,
        email: userInfo.email,
      };
      dispatch(getTripHistory(params));
    }
  }, [dispatch, userInfo, slug]);

  return (
    <>
      {!userInfo || !listTripHistory ? (
        <Loading />
      ) : (
        <div className="profile">
          <Grid className="profile-layout" spacing={3}>
            <Grid xs={3} style={{ maxWidth: "30%" }}>
              <Card className="profile_title">
                <Avatar alt="Remy Sharp" src={userInfo.avatar.urlImage} />
                <p className="name-profile">{userInfo.name}</p>
              </Card>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Card className="card-item">
                  <p className="title">Giới thiệu</p>
                  <div className="card-item-content">
                    <Person /> Là thành viên từ :{" "}
                    <b>
                      {" "}
                      {moment(
                        userInfo.create_at,
                        "YYYY-MM-DDTHH:mm:ss.SSS"
                      ).format("DD-MM-YYYY")}
                    </b>
                  </div>
                  <div className="card-item-content">
                    <RateReview /> Luợt đánh giá: <b>{userInfo.vote} luợt</b>
                  </div>
                  <Rating
                    name="size-large"
                    defaultValue={Number(userInfo.rate)}
                    size="large"
                    readOnly
                    className="rate"
                  />
                </Card>
                {dataUser._id === userInfo._id ?  
                  <Card className="card-item">
                    <div className="card-my-info">
                      <p className="title">Thông tin cá nhân</p>
                      <Edit
                        className="icon-edit"
                        fontSize="large"
                        onClick={() => setIsShowModal(true)}
                      />
                    </div>
                    <div className="card-item-content">
                      <Email /> Email : <b>{userInfo.email}</b>
                    </div>
                    <div className="card-item-content">
                      <ContactPhone /> Số điện thoại : <b>{userInfo.phone}</b>
                    </div>
                    <div className="card-item-content">
                      <Accessibility /> Giới tính : <b>{sex}</b>
                    </div>
                  </Card> : 
                  <Card className="card-item">
                    <div className="card-my-info">
                      <p className="title">Chuyến đi đã tạo</p>
                    </div>
                    <div className="card-item-content">
                      <Email /> Email : <b>{userInfo.email}</b>
                    </div>
                    <div className="card-item-content">
                      <ContactPhone /> Số điện thoại : <b>{userInfo.phone}</b>
                    </div>
                    <div className="card-item-content">
                      <Accessibility /> Giới tính : <b>{sex}</b>
                    </div>
                  </Card>
                }
              </Grid>

              <Grid item xs={8}>
                <Card className="card-item card-item-history">
                  <p className="title title-list-trip">
                    Những chuyến đi gần đây
                  </p>
                  {listTripHistory.length === 0 ? (
                    <NotData
                      content={`${
                        dataUser._id === userInfo._id ? "Bạn" : userInfo.name
                      } chưa tham gia chuyến đi nào`}
                    />
                  ) : (
                    <>
                      {listTripHistory.map((trip, index) => {
                        const author = JSON.parse(trip.author_info);
                        const image = JSON.parse(trip.url_image).urlImage;
                        return (
                          <div className="list-trip-history" key={index}>
                            <FiberManualRecord
                              color="primary"
                              className="icon-list-trip"
                            />
                            <div className="trip-item">
                              <div className="trip-item-image">
                                <img src={`${image}`} alt="anh-chuyen-di" />
                              </div>
                              <div className="trip-item-content">
                                <h4 className="trip-item-title">
                                  {trip.title}
                                </h4>
                                <p>Người tạo: {author.name}</p>
                                <p>
                                  Ngày đi: {trip.start_at}
                                  {moment(
                                    trip.start_at,
                                    "YYYY-MM-DDTHH:mm:ss.SSS+00"
                                  ).format("DD-MM-YYYY HH:mm:ss")}
                                </p>
                                <p>Điểm đi: {trip.start_place}</p>
                                <p>Điểm đến: {trip.end_place}</p>
                                {/* <p>Thành viên: 27/07/2022</p> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Modal
            isShowModal={isShowModal}
            handleShowModal={setIsShowModal}
            title="Thông tin của bạn"
            type="profile"
          />
        </div>
      )}
    </>
  );
}

export default Profile;
