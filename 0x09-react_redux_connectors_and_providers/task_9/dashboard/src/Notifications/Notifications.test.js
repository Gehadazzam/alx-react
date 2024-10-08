import React from "react";
import { shallow, mount } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { getFilteredNotifications } from "../selectors/notificationSelectors";
import { StyleSheetTestUtils } from "aphrodite";

describe("Notifications Component rendering tests", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders <Notifications /> without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper).toBeDefined();
  });

  it('renders text "Here is the list of notifications"', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    const text = wrapper.find("p").last().text();
    expect(text).toContain("Here is the list of notifications");
  });

  it("renders the menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("does not render div.Notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(false);
  });

  it("renders the menu item when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("renders div.Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("renders correctly when listNotifications is empty", () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );
    expect(wrapper.find("ul").text()).toContain("No new notification for now");
  });

  it("renders correctly when listNotifications is not passed", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("ul").text()).toContain("No new notification for now");
  });

  it("renders correctly with right number of <NotificationItem /> items", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "<p>Latest notification</p>" } },
    ];

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    const listItems = wrapper.find(NotificationItem);
    expect(listItems).toHaveLength(3);
  });

  it('does not render the "Here is the list of notifications" message when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications listNotifications={[]} />);
    expect(wrapper.find("p").text()).not.toContain(
      "Here is the list of notifications"
    );
  });

  it("checks that the component does not render when updated with same list", () => {
    const initialNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", value: "Urgent update is available" },
    ];

    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={initialNotifications} />
    );
    const initialNumberOfNotifications = wrapper.find(NotificationItem).length;
    wrapper.setProps({ listNotifications: initialNotifications });

    const currentNumberOfNotificationItems =
      wrapper.find(NotificationItem).length;
    expect(currentNumberOfNotificationItems).toBe(initialNumberOfNotifications);
  });

  it("checks that the component renders when updated with a longer list", () => {
    const initialNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", value: "Urgent update is available" },
    ];
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={initialNotifications} />
    );
    const initialNumberOfNotifications = wrapper.find(NotificationItem).length;

    const updatedNotifications = [
      ...initialNotifications,
      { id: 4, type: "default", value: "New update is available" },
    ];

    wrapper.setProps({ listNotifications: updatedNotifications });
    const currentNumberOfNotificationItems =
      wrapper.find(NotificationItem).length;

    expect(currentNumberOfNotificationItems).toBeGreaterThan(
      initialNumberOfNotifications
    );
  });

  it("calls handleDisplayDrawer after clicking on the menu item", () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.find("div").at(0).simulate("click");
    expect(handleDisplayDrawer).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it("calls handleHideDrawer after clicking on the close button", () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.find("button").at(0).simulate("click");
    expect(handleHideDrawer).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it("calls fetchNotifications when the component is mounted", () => {
    const fetchNotifications = jest.fn();
    jest.spyOn(React, "useEffect").mockImplementationOnce((fn) => fn());
    mount(<Notifications fetchNotifications={fetchNotifications} />);
    expect(fetchNotifications).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it("calls markNotificationAsRead when a notification is clicked", () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(
      <Notifications markNotificationAsRead={markNotificationAsRead} />
    );
    wrapper.find(NotificationItem).at(0).simulate("click");
    expect(markNotificationAsRead).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it("Clicking on the first button should call setNotificationFilter with URGENT", () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(
      <Notifications setNotificationFilter={setNotificationFilter} />
    );
    wrapper.find("button").at(0).simulate("click");
    expect(setNotificationFilter).toHaveBeenCalledWith("URGENT");
    jest.restoreAllMocks();
  });

  it("Clicking on the second button should call setNotificationFilter with DEFAULT", () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(
      <Notifications setNotificationFilter={setNotificationFilter} />
    );
    wrapper.find("button").at(1).simulate("click");
    expect(setNotificationFilter).toHaveBeenCalledWith("DEFAULT");
    jest.restoreAllMocks();
  });
});
