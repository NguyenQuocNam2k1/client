import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar , Chip} from '@material-ui/core';
import { Face , Done} from '@material-ui/icons';

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

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root}>
      {chips.map((item, index) => {
        return (
          <Chip icon={item.image} key={index}
            label={item.label}
            clickable
            color="primary"
            onClick={handleClick}
            onDelete={handleDelete}
            variant = {item.variant || "default"}
            // deleteIcon={<Done />}
            />
        )
      })}
    </div>
  );
}


export default ChipsSelect;