const initialState = {
  notifications: {},
  loading: false,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING_STATE":
      return {
        ...state,
        loading: action.loading,
      };
    case "FETCH_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        notifications: { ...state.notifications, ...action.notifications },
        loading: false,
      };
    default:
      return state;
  }
}
