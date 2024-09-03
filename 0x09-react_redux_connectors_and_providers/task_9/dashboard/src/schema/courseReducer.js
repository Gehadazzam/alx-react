import { Map } from "immutable";
import { coursesNormalizer } from "./courses";

// Normalize function for courses data

// Initial state using Immutable.js Map
const initialState = Map({
  entities: Map({}),
  result: [],
});

// Course reducer function
export function courseReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_COURSE_SUCCESS":
      const normalizedData = coursesNormalizer(action.data);
      return state.mergeDeep(
        Map({
          entities: Map(normalizedData.entities),
          result: normalizedData.result,
        })
      );

    case "SELECT_COURSE":
      return state.setIn(
        ["entities", "courses", action.index, "isSelected"],
        true
      );

    case "UNSELECT_COURSE":
      return state.setIn(
        ["entities", "courses", action.index, "isSelected"],
        false
      );

    default:
      return state;
  }
}
