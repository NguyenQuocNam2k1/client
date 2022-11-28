import React, { useEffect } from "react";
import "~/assets/style/history.scss";
import NotData from "~/components/layout/NotData";
import { Divider } from "@material-ui/core";
import Card from "-cl/Card";
import { getTripHistory, getUser } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "~/components/core/cookie";

function History() {
  const dispatch = useDispatch();
  const { listTripHistory } = useSelector((state) => state.pages);
  const { dataUser } = useSelector((state) => state.users);

  useEffect(() => {
    const email = getCookie("CD_email");
    dispatch(getUser({email}));
  }, [])
  useEffect(() => {
    if (!dataUser) return;
    const params = {
      name_user: dataUser.name,
      email: dataUser.email,
    };
    dispatch(getTripHistory(params));
  }, [dispatch, dataUser]);

  return (
    <div className="history">
      <div className="history_item">
        <div className="history_item_text">
          <h3>Những chuyến đi bạn đã tham gia</h3>
          <Divider />
        </div>
        {!listTripHistory || listTripHistory.length === 0 ? (
          <NotData content="Bạn chưa tham gia chuyến đi nào" />
        ) : (
          <Card listData={listTripHistory} />
        )}
      </div>
    </div>
  );
}

export default History;
