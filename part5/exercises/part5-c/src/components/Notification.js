import React from 'react';
const Notification = (props) => {
  if (!props.message && !props.status) return null;
  return <div className={props.status}>{props.message}</div>;
};

export default Notification;
