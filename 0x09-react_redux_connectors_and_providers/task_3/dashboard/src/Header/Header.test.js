/**
 * @jest-environment jsdom
 */

import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from "../App/AppContext";

describe("Header", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("render <Header /> without crashing", () => {
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it("should render a <h1 />", () => {
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: () => {},
    };

    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    const h1 = wrapper.find("h1");
    expect(h1.exists()).toBe(true);
  });

  it("should render a <img />", () => {
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: () => {},
    };

    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
  });

  it("should not render logoutSection with default context values", () => {
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: () => {},
    };

    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    const logoutSection = wrapper.find("#logoutSection");
    expect(logoutSection.exists()).toBe(false);
  });

  it("should render logoutSection with a user defined and isLoggedIn context values", () => {
    const context = {
      user: {
        email: "me@me.com",
        password: "123456",
        isLoggedIn: true,
      },
      logOut: () => {},
    };

    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    const logoutSection = wrapper.find("#logoutSection");
    expect(logoutSection.exists()).toBe(true);
  });

  it("it should call the logOut function when logout Link is clicked", () => {
    const context = {
      user: {
        email: "me@me.com",
        password: "123456",
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    const logoutSpy = jest.spyOn(context, "logOut");
    const wrapper = shallow(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    wrapper.find("#logoutSection a").simulate("click");
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
