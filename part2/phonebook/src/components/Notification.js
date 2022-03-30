const Notification = ({ notif: { type, message } }) => {
  if (!type) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
