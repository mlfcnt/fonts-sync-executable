import { Notification } from "rsuite";

export const openToast = (funcName, title, description) => {
  Notification[funcName]({
    title,
    description,
  });
};
