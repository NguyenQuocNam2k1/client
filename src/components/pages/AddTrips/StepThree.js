import React, {useState} from 'react';
import { Grid} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


function StepThree(props) {
  const navigate = useNavigate();

  const handleComplete = () => {
    
  }
  return (
    <div className="step-three">
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <h5>Thông tin cơ bản</h5>
            <div className="step-three_info_content">
              <Grid container>
                <Grid item xs={6} className="step-three_info_content_item">
                  <p><b>Điểm đi: </b> Hà Nội</p>
                </Grid>
                <Grid item xs={6} className="step-three_info_content_item">
                  <p><b>Điểm đến: </b> Hà Nam</p>
                </Grid>
                <Grid item xs={12}  className="step-three_info_content_item">
                  <p><b>Tiêu đề: </b> Chuyến đi về quê</p>
                </Grid>
                <Grid item xs={6} className="step-three_info_content_item">
                  <p><b>Hashtask: </b> #abc #def</p>
                </Grid>
                <Grid item xs={6} className="step-three_info_content_item">
                  <p><b>Thời gian: </b> 30/10/2022 14:00:00</p>
                </Grid>
                <Grid item xs={4} className="step-three_info_content_item">
                  <p><b>Xe đi:</b> Xe máy</p>
                </Grid>
                <Grid item xs={4} className="step-three_info_content_item">
                  <p><b>Loại xe: </b>Wave</p>
                </Grid>
                <Grid item xs={4} className="step-three_info_content_item">
                  <p><b>Số người tham gia: </b>1 người</p>
                </Grid>
                <Grid item xs={12} className="step-three_info_content_item">
                  <p><b>Chi phí tham gia / 1 người: </b> Free</p>
                </Grid>
                <Grid item xs={12} className="step-three_info_content_item">
                  <p><b>Số điện thoại:</b> 0974032570 </p>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={5}>
            <h5>Yêu cầu , nội quy của chuyến đi</h5>
            <div className="step-three_info_content require_create">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed lobortis turpis quam, ultrices elementum nibh tempus sed. 
              Aenean at mi in mi porttitor cursus quis et enim. 
              Phasellus a tortor nec risus luctus iaculis. 
              Pellentesque dictum, eros ut ultrices porttitor, augue mi imperdiet leo, nec sodales diam eros vel turpis. 
              Donec eu semper ipsum. Proin sit amet orci rutrum, vestibulum nunc vel, sagittis eros. 
              Quisque laoreet sapien eu sollicitudin consectetur. 
              Aliquam porta erat metus, vitae volutpat massa ultrices vel. Nullam risus dui, euismod eu congue in, porttitor eu elit. 
              Ut quis massa euismod, sollicitudin enim vel, rutrum ex. Vivamus id sagittis turpis. Mauris tellus felis, dignissim et tincidunt sed, efficitur vitae augue. 
              Mauris blandit sapien eu nulla posuere, sit amet lobortis orci dictum. Mauris a iaculis massa, vel malesuada libero. Suspendisse sed tortor efficitur, porta nulla sit amet, aliquam nibh. Nulla iaculis turpis urna, eu aliquet odio euismod sit amet.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed lobortis turpis quam, ultrices elementum nibh tempus sed. 
              Aenean at mi in mi porttitor cursus quis et enim. 
              Phasellus a tortor nec risus luctus iaculis. 
              Pellentesque dictum, eros ut ultrices porttitor, augue mi imperdiet leo, nec sodales diam eros vel turpis. 
              Donec eu semper ipsum. Proin sit amet orci rutrum, vestibulum nunc vel, sagittis eros. 
              Quisque laoreet sapien eu sollicitudin consectetur. 
              Aliquam porta erat metus, vitae volutpat massa ultrices vel. Nullam risus dui, euismod eu congue in, porttitor eu elit. 
              Ut quis massa euismod, sollicitudin enim vel, rutrum ex. Vivamus id sagittis turpis. Mauris tellus felis, dignissim et tincidunt sed, efficitur vitae augue. 
              Mauris blandit sapien eu nulla posuere, sit amet lobortis orci dictum. Mauris a iaculis massa, vel malesuada libero. Suspendisse sed tortor efficitur, porta nulla sit amet, aliquam nibh. Nulla iaculis turpis urna, eu aliquet odio euismod sit amet.
            </div>
          </Grid>
        </Grid>
    </div>
  )
}


export default StepThree
