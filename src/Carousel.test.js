import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

test("it renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("Clicking arrows changes current card", () => {
  const { getByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Initially, the first image should be displayed
  expect(getByTestId("card-caption")).toHaveTextContent("testing image 1");

  // Clicking the right arrow should display the next image
  fireEvent.click(getByTestId("right-arrow"));
  expect(getByTestId("card-caption")).toHaveTextContent("testing image 2");

  // Clicking the left arrow should display the previous image
  fireEvent.click(getByTestId("left-arrow"));
  expect(getByTestId("card-caption")).toHaveTextContent("testing image 1");
});

test("should hide left arrow if on the first image, right arrow if on the last picture", () => {
  const { queryByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Initially, left arrow should be hidden
  expect(queryByTestId("left-arrow")).toBeNull();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // Clicking the right arrow twice to go to the last picture
  fireEvent.click(queryByTestId("right-arrow"));
  fireEvent.click(queryByTestId("right-arrow"));
  // Now on the last picture, right arrow should be hidden
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeNull();
});
