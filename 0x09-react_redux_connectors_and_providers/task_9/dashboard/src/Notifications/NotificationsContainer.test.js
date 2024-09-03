import React from "react";
import { shallow } from "enzyme";
import NotificationsContainer from "./NotificationsContainer";

describe("NotificationsContainer Component rendering tests", () => {
  it("renders <NotificationsContainer /> without crashing", () => {
    const wrapper = shallow(<NotificationsContainer />);
    expect(wrapper).toBeDefined();
  });
});
