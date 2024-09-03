import {
  selectCourse,
  unSelectCourse,
  fetchCourseSuccess,
  setCourses,
  fetchCourses,
} from "./courseActionCreators";
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
  SET_COURSES,
} from "./courseActionTypes";
import { courseReducer } from "../reducers/courseReducer";

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

  it("should create an action for FETCH_COURSE_SUCCESS", () => {
    const data = [{ id: 1, name: "ES6", credit: 60 }];
    const expectedAction = {
      type: FETCH_COURSE_SUCCESS,
      data,
    };
    expect(fetchCourseSuccess(data)).toEqual(expectedAction);
  });

  it("should create an action for SET_COURSES", () => {
    const data = [{ id: 1, name: "ES6", credit: 60 }];
    const expectedAction = {
      type: SET_COURSES,
      data,
    };
    expect(setCourses(data)).toEqual(expectedAction);
  });

  it("should fetch courses successfully", async () => {
    const dispatch = jest.fn();
    jest.spyOn(window, "fetch").mockResolvedValue({
      json: () => Promise.resolve([{ id: 1, name: "ES6", credit: 60 }]),
    });
    await fetchCourses(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      setCourses([{ id: 1, name: "ES6", credit: 60 }])
    );
  });

  it("should handle errors when fetching courses", async () => {
    const dispatch = jest.fn();
    jest
      .spyOn(window, "fetch")
      .mockRejectedValue(new Error("Error fetching courses"));
    await fetchCourses(dispatch);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching courses:",
      new Error("Error fetching courses")
    );
  });
});

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
    expect(state).toEqual(
      courses.map((course) => ({ ...course, isSelected: false }))
    );
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

  it("should handle SET_COURSES", () => {
    const courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
    ];
    const action = {
      type: SET_COURSES,
      data: courses,
    };
    const state = courseReducer(undefined, action);
    expect(state).toEqual(
      courses.map((course) => ({ ...course, isSelected: false }))
    );
  });
});
