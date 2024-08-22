import notifications from "../../notifications.json";

export default function getAllNotificationsByUser(userId) {
  const notificationFilter = notifications.filter((notification) => {
    return notification.author.id === userId;
  });

  return notificationFilter.map((notification) => {
    return notification.context;
  });
}
