import React from "react";
import { Grid, TextareaAutosize } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { actFetchNewTrip } from "~/redux/actions";

function StepThree() {
  const dispatch = useDispatch();
  const { newTrip } = useSelector((state) => state.pages);

  const handleEnterData = (value) => {
    const dataTrip = {...newTrip};
    dataTrip['rules'] = value;
    let params = {
      data: dataTrip,
    }
    dispatch(actFetchNewTrip(params));
  }
  return (
    <div className="step-three">
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <h5>Thông tin cơ bản</h5>
          <div className="step-three_info_content">
            <Grid container>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Điểm đi: </b> {newTrip.start_place}
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Điểm đến: </b> {newTrip.end_place}
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Tiêu đề: </b> {newTrip.title}
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Hashtags: </b> {newTrip.hashtags}
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Thời gian: </b> {newTrip.start_at}
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Xe đi:</b> {newTrip.xe_di}
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Loại xe: </b>{newTrip.loai_xe}
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Số người tham gia: </b>{newTrip.number_member}
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Chi phí tham gia / 1 người: </b> {newTrip.cost} VNĐ
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Số điện thoại:</b> {newTrip.phone_number}{" "}
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={5}>
          <h5>Yêu cầu , nội quy của chuyến đi</h5>
          <TextareaAutosize
            minRows={11}
            maxRows={11}
            className="step-three_info_content require_create"
            aria-label="maximum height"
            placeholder="Nhập nội quy chuyến đi của bạn"
            defaultValue=""
            onChange={e => handleEnterData(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default StepThree;
