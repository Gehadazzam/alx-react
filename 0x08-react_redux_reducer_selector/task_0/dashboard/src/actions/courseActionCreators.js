import { bindActionCreators } from "redux";
import { selectCourse, unSelectCourse } from "./courseActionTypes";
export const boundSelectCourse = (dispatch) => {
  return bindActionCreators({ selectCourse }, dispatch);
};

export const boundUnSelectCourse = (dispatch) => {
  return bindActionCreators({ unSelectCourse }, dispatch);
};
