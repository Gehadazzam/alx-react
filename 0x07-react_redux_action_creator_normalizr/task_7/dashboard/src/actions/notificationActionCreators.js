import { MARK_AS_READ, SET_TYPE_FILTER } from "./notificationActionTypes";
import { bindActionCreators } from "redux";

export const markAsAread = (index) => {
  return {
    type: MARK_AS_READ,
    index,
  };
};

export const setNotificationFilter = (filter) => {
  return {
    type: SET_TYPE_FILTER,
    filter,
  };
};

export const boundMarkAsAread = (dispatch) => {
  return bindActionCreators({ markAsAread }, dispatch);
};

export const boundSetNotificationFilter = (dispatch) => {
  return bindActionCreators({ setNotificationFilter }, dispatch);
};
