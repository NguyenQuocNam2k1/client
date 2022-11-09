import React from "react";
import { Grid, TextareaAutosize } from "@material-ui/core";

function StepThree({handleEnterData}) {
  return (
    <div className="step-three">
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <h5>Thông tin cơ bản</h5>
          <div className="step-three_info_content">
            <Grid container>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Điểm đi: </b> Hà Nội
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Điểm đến: </b> Hà Nam
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Tiêu đề: </b> Chuyến đi về quê
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Hashtask: </b> #abc #def
                </p>
              </Grid>
              <Grid item xs={6} className="step-three_info_content_item">
                <p>
                  <b>Thời gian: </b> 30/10/2022 14:00:00
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Xe đi:</b> Xe máy
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Loại xe: </b>Wave
                </p>
              </Grid>
              <Grid item xs={4} className="step-three_info_content_item">
                <p>
                  <b>Số người tham gia: </b>1 người
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Chi phí tham gia / 1 người: </b> Free
                </p>
              </Grid>
              <Grid item xs={12} className="step-three_info_content_item">
                <p>
                  <b>Số điện thoại:</b> 0974032570{" "}
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
            onChange={e => handleEnterData("rules", e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default StepThree;
