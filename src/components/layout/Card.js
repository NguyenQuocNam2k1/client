import React from "react";
import { Grid, Divider } from "@material-ui/core";
import "~/assets/style/card.scss";
import test from "~/assets/image/home_page/homePage2.jpg";

const Card = ({ listData }) => {
  return (
    <div className="card">
      <Grid container className="card_item">
        <Grid item xs={3}>
          <img src={test} alt="anh_card" className="img_card_item" />
        </Grid>
        <Grid item xs={9} className="card_item_content">
          <div>
            <h4 className="card_item_content_header">Nguyễn Quốc Nam</h4>
            <p className="three_dot card_item_content_des">
              Ut posuere dictum dictum. Cras quis ex ligula. Sed felis quam,
              cursus id blandit a, ultricies a nibh. Nunc mi ante, aliquet a
              consectetur ut, sodales nec ipsum. Curabitur condimentum vestibulum
              porta. Etiam malesuada ut ipsum quis volutpat. Morbi aliquam enim a
              magna facilisis, nec aliquam diam mattis. In convallis aliquam
              turpis, id convallis lectus fermentum ac. Morbi vulputate purus at
              nisl malesuada varius. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Phasellus a dapibus enim. Integer a odio ut justo
              pellentesque blandit ac sit amet nisi. Nam lobortis convallis
              luctus.
            </p>
          </div>
          <div className="card_item_content_action">
            <p>Ngày <b>23</b> tháng <b>10</b> năm <b>2022</b></p>
            <p className="view_detail">Xem chi tiết</p>
          </div>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default Card;
