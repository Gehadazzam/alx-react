import { schema, normalize } from "normalizr";
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

const normalizedData = normalize(notifications, [notification]);

export default function getAllNotificationsByUser(userId) {
  return Object.values(normalizedData.entities.notifications)
    .filter((notification) => notification.author === userId)
    .map(
      (notification) => normalizedData.entities.messages[notification.context]
    );
}
export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}
