import { selectCourse, unSelectCourse } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";
import { courseReducer } from "../reducers/courseReducer";
import { FETCH_COURSE_SUCCESS } from "./courseActionTypes";

describe("courseReducer", () => {
  it("should return the default state as an empty array", () => {
    const state = courseReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it("should handle FETCH_COURSE_SUCCESS", () => {
    const courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
    ];
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    };
    const state = courseReducer(undefined, action);
    expect(state).toEqual(courses);
  });

  it("should handle SELECT_COURSE", () => {
    const initialState = [
      { id: 1, name: "ES6", isSelected: false },
      { id: 2, name: "Webpack", isSelected: false },
    ];
    const action = {
      type: SELECT_COURSE,
      index: 1,
    };
    const expectedState = [
      { id: 1, name: "ES6", isSelected: true },
      { id: 2, name: "Webpack", isSelected: false },
    ];
    const state = courseReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle UNSELECT_COURSE", () => {
    const initialState = [
      { id: 1, name: "ES6", isSelected: true },
      { id: 2, name: "Webpack", isSelected: false },
    ];
    const action = {
      type: UNSELECT_COURSE,
      index: 1,
    };
    const expectedState = [
      { id: 1, name: "ES6", isSelected: false },
      { id: 2, name: "Webpack", isSelected: false },
    ];
    const state = courseReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});

describe("courseActionCreators", () => {
  it("should create an action to select a course", () => {
    const expectedAction = {
      type: SELECT_COURSE,
      index: 1,
    };
    expect(selectCourse(1)).toEqual(expectedAction);
  });

  it("should create an action to unselect a course", () => {
    const expectedAction = {
      type: UNSELECT_COURSE,
      index: 1,
    };
    expect(unSelectCourse(1)).toEqual(expectedAction);
  });
});
