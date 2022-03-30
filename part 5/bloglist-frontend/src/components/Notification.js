import PropTypes from "prop-types";

const Notification = ({ notif }) =>
  notif?.message ? <div className={notif.type}>{notif.message}</div> : null;

Notification.propTypes = {
  notif: PropTypes.object.isRequired,
};

export default Notification;
