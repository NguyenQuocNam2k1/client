import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const Notification = ({severity, title, content, highlight, classAnimation}) => {
  return (
    <Alert severity={severity} className={`${classAnimation} notification`}>
        <AlertTitle>{title}</AlertTitle>
        {content && `${content} — <strong>${highlight}!</strong>`}
      </Alert>
  )
}


export default Notification;
