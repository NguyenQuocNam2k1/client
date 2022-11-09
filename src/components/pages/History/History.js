import React, {useEffect} from "react";
import "~/assets/style/history.scss";
import NotData from '~/components/layout/NotData';
import {Divider} from '@material-ui/core';
import Card from "-cl/Card";
import { getTrips, getTripHistory} from "~/redux/actions";
import { useDispatch, useSelector } from 'react-redux';


function History() {
  const { listTrip } = useSelector((state) => state.pages);
  const dispatch = useDispatch();
  const {listTripHistory} = useSelector((state) => state.pages);
  const { userInfo, dataUser } = useSelector((state) => state.users);

  useEffect(() => {
    if(userInfo){
      const params = {
        name_user: userInfo.name,
        email: userInfo.email,
      };
      dispatch(getTripHistory(params));
    }
  }, [dispatch, userInfo]);
  const renderListHistory = () => {
    return (
      <div className = "history_item">
        <div className="history_item_text">
          <h3 >Những chuyến đi bạn đã tham gia</h3>
          <Divider />
        </div>
        <Card listData={listTripHistory} />
      </div>
    )
  }
  return (
    <div className="history">
      {
        listTrip.length ? renderListHistory() : <NotData content = "Bạn chưa tham gia chuyến đi nào"/>
      }
    </div>
  )
}

export default History;
