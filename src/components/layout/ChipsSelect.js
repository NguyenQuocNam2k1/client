import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar , Chip} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "~/redux/actions";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ChipsSelect = ({chips}) => {
  const classes = useStyles();
  const [placeRemoved, setPlaceRemoved] = useState([]);
  const { dataUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (place) => {
    const newPlaceRemoved = [...placeRemoved];
    newPlaceRemoved.push(place);
    setPlaceRemoved(newPlaceRemoved);
  };

  const handleClick = (place) => {
    const params = {
      valueSearch: place,
    }
    dispatch(getTrips(params));
  };

  return (
    <div className={classes.root}>
      {chips.map((item, index) => {
        return (
          <div key={index} className={`${dataUser.theme.includes(item.key) || placeRemoved.includes(item.key) ? "hide-item" : ""}`}>
            {dataUser.theme.includes(item.key) || placeRemoved.includes(item.key) ? "" : 
              <Chip icon={item.image} key={index}
                label={item.name}
                clickable
                color="primary"
                onClick={() => handleClick(item.name)}
                onDelete={() => handleDelete(item.key)}
                variant = {item.variant || "default"}
                />
            }
          </div>
        )
      })}
    </div>
  );
}


export default ChipsSelect;