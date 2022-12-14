import React, { useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import "~/assets/style/card.scss";

const Card = ({ listData }) => {

  const formatStartAt = (startAt) => {
    const year = startAt.slice(0,4);
    const month = startAt.slice(5,7);
    const day = startAt.slice(8,10);

    return (
      <p>
        Ngày <b>{day}</b> tháng <b>{month}</b> năm <b>{year}</b>
      </p>
    );
  };
  return (
    <React.Fragment>
      {listData.map((data, index) => {
        const imageTrip = JSON.parse(data.url_image).urlImage;
        const nameAuthor = JSON.parse(data.author_info).name;
          return (
            <div className="card" key={index}>
              <Grid container className="card_item">
                <Grid item xs={3}>
                  <img src={imageTrip} alt="anh_card" className="img_card_item" />
                </Grid>
                <Grid item xs={9} className="card_item_content">
                  <div>
                    <h4 className="card_item_content_header">
                      {data.title}
                    </h4>
                    <p className="three_dot card_item_content_des">
                      Người tạo: <b>{nameAuthor}</b>
                    </p>
                    <p className="three_dot card_item_content_des">
                      {data.rules}
                    </p>
                  </div>
                  <div className="card_item_content_action">
                    <p>
                      {formatStartAt(data.start_at)}
                    </p>
                    <p className="view_detail">Xem chi tiết</p>
                  </div>
                </Grid>
              </Grid>
              <Divider />
            </div>
          )
      })
    }
    </React.Fragment>
  );
};

export default Card;
