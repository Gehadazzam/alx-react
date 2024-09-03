import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer"; // Assuming rootReducer is the combined reducer

describe("App Component", () => {
  it("renders correctly", () => {
    const store = createStore(rootReducer);
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
