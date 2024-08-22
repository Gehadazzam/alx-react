import { schema } from "normalizr";
import notifications from "../../notifications.json";

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: "guid",
  }
);

const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

export default function getAllNotificationsByUser(userId) {
  const notificationFilter = notifications.filter((notification) => {
    return notification.author.id === userId;
  });

  return notificationFilter.map((notification) => {
    return notification.context;
  });
}
