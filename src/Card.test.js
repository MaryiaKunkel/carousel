import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

test("it renders without crashing", () => {
  render(<Card />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});

test("playing with queries", () => {
  const { getByText } = render(<Card />);
  console.log(getByText(`Image`, { exact: false }));
});
