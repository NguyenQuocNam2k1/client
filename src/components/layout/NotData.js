import React from 'react';
import "~/assets/style/global.scss";
import imageNoData from "~/assets/image/image-not-found.webp";

const NotData = ({content}) => {
  return (
    <div className='not_data'>
        <div className="not_data_text">
          <img src={imageNoData} alt="icon_not_data" />
          <p>{content}</p>
        </div>
    </div>
  )
}

export default NotData;
