import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification.message && (
        <div className={notification.status}>{notification.message}</div>
      )}
    </div>
  );
};

export default Notification;
