import {
  render,
  screen
} from "@testing-library/react";



import PersonDetails from "./index";

const personData = {
  data: {
    name: "Benedict Cumberbatch",
    birthday: "1976-07-19",
    biography: "bla bla bla",
    place_of_birth : "portugal" ,
    profile_path: "nrionijvwpoejwoejkeefwef"
  },
};

describe("Person Details Component Tests", () => {
  test("render name", () => {
    render(<PersonDetails data={personData.data}></PersonDetails>);

    const h1Element = screen.getByRole("heading");

    expect(h1Element).toHaveTextContent("Benedict Cumberbatch");
  });

  test("render biography", () => {
    render(<PersonDetails data={personData.data}></PersonDetails>);

    const biographyElement = screen.getByTestId("biography");

    expect(biographyElement).toHaveTextContent("Biography: bla bla bla");
  });
});
