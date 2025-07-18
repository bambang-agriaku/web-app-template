import { Notification } from "./notification";
import { useNotifications } from "./notifications-store";

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </>
  );
};
