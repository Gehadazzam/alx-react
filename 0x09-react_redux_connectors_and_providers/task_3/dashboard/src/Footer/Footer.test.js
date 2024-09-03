import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer"; // Import the stateless component instead of connected component

describe("Footer Component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Footer /* pass necessary props */ />);
    expect(wrapper).toMatchSnapshot();
  });
});
