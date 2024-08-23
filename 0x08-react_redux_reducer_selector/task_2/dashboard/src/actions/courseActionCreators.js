import { bindActionCreators } from "redux";
import { selectCourse, unSelectCourse } from "./courseActionTypes";
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "./courseActionTypes";
export const boundSelectCourse = (dispatch) => {
  return bindActionCreators({ selectCourse }, dispatch);
};

export const boundUnSelectCourse = (dispatch) => {
  return bindActionCreators({ unSelectCourse }, dispatch);
};

export const fetchCourseSuccess = (data) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    data,
  };
};

selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index,
  };
};

unSelectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index,
  };
};

export const courseReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      return action.data.map((course) => ({
        ...course,
        isSelected: false,
      }));
    case SELECT_COURSE:
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: true } : course
      );
    case UNSELECT_COURSE:
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: false } : course
      );
    default:
      return state;
  }
};
