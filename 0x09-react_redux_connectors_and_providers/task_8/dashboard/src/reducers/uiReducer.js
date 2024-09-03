import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/uiActionTypes";

const initialState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return {
        ...state,
        isNotificationDrawerVisible: true,
      };
    case HIDE_NOTIFICATION_DRAWER:
      return {
        ...state,
        isNotificationDrawerVisible: false,
      };
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isUserLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
export default uiReducer;
