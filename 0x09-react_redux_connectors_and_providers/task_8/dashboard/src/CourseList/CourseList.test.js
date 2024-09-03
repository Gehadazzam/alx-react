import React from "react";
import { shallow, mount } from "enzyme";
import CourseList from "./CourseList";
import { StyleSheetTestUtils } from "aphrodite";
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from "../actions/courseActionCreators";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers/courseReducer";

describe("CourseList component tests", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper).toBeDefined();
  });

  describe("tests when listCourses is Empty", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CourseList />);
    });
    it("renders correctly if you pass an empty array", () => {
      const courseListRows = wrapper.find("div");
      expect(courseListRows).toHaveLength(0); // Assuming each course item is wrapped in a div
    });
  });

  describe("tests when listCourses is not empty", () => {
    let wrapper;
    beforeEach(() => {
      const listCourses = [
        { id: "1", name: "ES6", credit: 60 },
        { id: "2", name: "Webpack", credit: 20 },
        { id: "3", name: "React", credit: 40 },
      ];
      wrapper = shallow(<CourseList listCourses={listCourses} />);
    });
    it("renders correctly if you pass a non empty array", () => {
      const courseListRows = wrapper.find("div");
      expect(courseListRows).toHaveLength(3); // Assuming each course item is wrapped in a div
    });
  });

  describe("action dispatch tests", () => {
    let store;
    beforeEach(() => {
      store = createStore(rootReducer);
    });

    it("dispatches fetchCourses action when mounted", () => {
      jest.spyOn(store, "dispatch");
      mount(
        <Provider store={store}>
          <CourseList />
        </Provider>
      );
      expect(store.dispatch).toHaveBeenCalledWith(fetchCourses());
    });

    it("dispatches selectCourse and unSelectCourse actions correctly", () => {
      jest.spyOn(store, "dispatch");
      const wrapper = mount(
        <Provider store={store}>
          <CourseList />
        </Provider>
      );
      const row = wrapper.find('input[type="checkbox"]').first();
      row.simulate("change", { target: { checked: true } });
      expect(store.dispatch).toHaveBeenCalledWith(selectCourse("1"));
      row.simulate("change", { target: { checked: false } });
      expect(store.dispatch).toHaveBeenCalledWith(unSelectCourse("1"));
    });
  });
});
