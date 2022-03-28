const Notification = ({ notif: { type, message } }) =>
  type ? <div className={type}>{message}</div> : null;

export default Notification;
