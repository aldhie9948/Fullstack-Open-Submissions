import React, { useState } from "react";

const Notification = ({ message, status }) => {
  const [notificationMessage, setNotificationMessage] = useState(message);
  if (message === null) {
    return null;
  }
  setTimeout(() => {
    setNotificationMessage(null);
  }, 5000);
  return <div className={status}>{notificationMessage}</div>;
};

export default Notification;
