import { render, screen } from "@testing-library/react";
import App from "./App";
import { fromJS } from "immutable";
import { mapStateToProps } from "./App";

describe("mapStateToProps", () => {
  it("returns the right object when passing a valid state", () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });

    const expectedResult = { isLoggedIn: true };
    const result = mapStateToProps(state);

    expect(result).toEqual(expectedResult);
  });
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
