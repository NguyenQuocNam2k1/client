import React from 'react';
import "~/assets/style/history.scss";
import NotData from '~/components/layout/NotData';
import {Divider} from '@material-ui/core';
import Card from "-cl/Card";

const listData = [
  "abc",
  "abc",
  "abc"
];
function History() {
  const renderListHistory = () => {
    return (
      <div className = "history_item">
        <div className="history_item_text">
          <h3 >Những chuyến đi bạn đã tham gia</h3>
          <Divider />
        </div>
        <Card listData={listData} />
      </div>
    )
  }
  return (
    <div className="history">
      {
        listData.length ? renderListHistory() : <NotData content="Bạn chưa tham gia chuyến đi nào"/>
      }
    </div>
  )
}

export default History;
