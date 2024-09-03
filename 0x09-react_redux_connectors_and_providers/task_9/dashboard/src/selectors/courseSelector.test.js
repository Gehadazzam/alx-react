import { allCoursesSelector } from "./courseSelector";
import { Map } from "immutable";

describe("courseSelector", () => {
  it("should select all courses from the state", () => {
    const state = {
      courses: Map({
        1: { id: 1, name: "Course 1" },
        2: { id: 2, name: "Course 2" },
        3: { id: 3, name: "Course 3" },
      }),
    };

    const expectedCourses = [
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
      { id: 3, name: "Course 3" },
    ];

    const selectedCourses = allCoursesSelector(state);

    expect(selectedCourses).toEqual(expectedCourses);
  });
});
