import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";

type NotificationType = "success" | "info" | "warning" | "error";

const openNotificationWithIcon = (
  type: NotificationType,
  title: string,
  description: string,
  placement: NotificationPlacement = "bottomRight",
) => {
  notification[type]({
    message: title,
    description: description,
    placement,
  });
};

export default openNotificationWithIcon;
