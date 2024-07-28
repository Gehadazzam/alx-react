import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

describe("getFullYear", () => {
  test("returns the current year", () => {
    const currentYear = new Date().getFullYear();
    expect(getFullYear()).toBe(currentYear);
  });
});

describe("getFooterCopy", () => {
  test("returns the correct string when true", () => {
    expect(getFooterCopy(true)).toBe("Holberton School");
  });

  test("returns the correct string when false", () => {
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  });
});

describe("getLatestNotification", () => {
  test("returns the correct string", () => {
    const expectedString =
      "<strong>Urgent requirement</strong> - complete by EOD";
    expect(getLatestNotification()).toBe(expectedString);
  });
});
