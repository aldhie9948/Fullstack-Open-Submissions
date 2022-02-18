import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  return (
    <div>
      {notification.visibility ? (
        <div style={style}>{notification.message}</div>
      ) : null}
    </div>
  );
};

export default Notification;
