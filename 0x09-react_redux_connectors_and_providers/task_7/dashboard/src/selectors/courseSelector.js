import { createSelector } from "reselect";
import { Map } from "immutable";

const courseEntitiesSelector = (state) => state.get("courses");

export const allCoursesSelector = createSelector(
  courseEntitiesSelector,
  (courses) => courses.valueSeq().toList()
);
