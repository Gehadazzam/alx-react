import { Map, fromJS } from "immutable";
import { courseReducer } from "./courseReducer";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

describe("courseReducer", () => {
  it("should return the initial state", () => {
    const initialState = Map({
      entities: Map({}),
      result: [],
    });
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_COURSE_SUCCESS", () => {
    const initialState = Map({
      entities: Map({}),
      result: [],
    });
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };
    const expectedState = fromJS({
      entities: {
        courses: {
          1: { id: 1, name: "ES6", credit: 60 },
          2: { id: 2, name: "Webpack", credit: 20 },
          3: { id: 3, name: "React", credit: 40 },
        },
      },
      result: [1, 2, 3],
    });
    expect(courseReducer(initialState, action).toJS()).toEqual(
      expectedState.toJS()
    );
  });

  it("should handle SELECT_COURSE", () => {
    const initialState = fromJS({
      entities: {
        courses: {
          1: { id: 1, name: "ES6", isSelected: false },
          2: { id: 2, name: "Webpack", isSelected: false },
        },
      },
      result: [1, 2],
    });
    const action = { type: SELECT_COURSE, index: "1" };
    const expectedState = initialState.setIn(
      ["entities", "courses", "1", "isSelected"],
      true
    );
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UNSELECT_COURSE", () => {
    const initialState = fromJS({
      entities: {
        courses: {
          1: { id: 1, name: "ES6", isSelected: true },
          2: { id: 2, name: "Webpack", isSelected: false },
        },
      },
      result: [1, 2],
    });
    const action = { type: UNSELECT_COURSE, index: "1" };
    const expectedState = initialState.setIn(
      ["entities", "courses", "1", "isSelected"],
      false
    );
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });
});
