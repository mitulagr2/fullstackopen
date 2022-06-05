import { useSelector } from "react-redux";

import { Alert } from "@material-ui/lab";

const Notification = () => {
  const { userData, blogData } = useSelector((state) => state);
  let notification = userData.notification;

  if (!notification.message.length) {
    notification = blogData.notification;

    if (!notification.message.length) {
      return null;
    }
  }

  return (
    <div>
      <Alert severity={notification.type}>{notification.message}</Alert>
    </div>
  );
};

export default Notification;
