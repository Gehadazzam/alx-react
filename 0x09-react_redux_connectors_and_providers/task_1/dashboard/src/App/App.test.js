import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Map } from "immutable";

describe("App component", () => {
  const initialState = {
    ui: Map({
      isNotificationDrawerVisible: false,
    }),
  };
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should render without crashing", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should contain the Notifications component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find("Notifications").exists()).toBe(true);
  });

  it("should contain the Header component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find("Header").exists()).toBe(true);
  });

  it("should contain the Login component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find("Login").exists()).toBe(true);
  });

  it("should contain the Footer component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find("Footer").exists()).toBe(true);
  });

  it("should not display CourseList when isLoggedIn is false", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find("CourseList").exists()).toBe(false);
  });

  it("should display CourseList when isLoggedIn is true", () => {
    const loggedInState = {
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: true,
      }),
    };
    const loggedInStore = mockStore(loggedInState);
    const wrapper = shallow(
      <Provider store={loggedInStore}>
        <App />
      </Provider>
    );
    expect(wrapper.find("CourseList").exists()).toBe(true);
    expect(wrapper.find("Login").exists()).toBe(false);
  });
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
