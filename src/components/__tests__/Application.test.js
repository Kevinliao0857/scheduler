import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, prettyDOM } from "@testing-library/react";


import Application from "components/Application";



afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});



describe("Application", () => {


  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  


  // it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   // 3. Click the "Delete" button on the booked appointment.
  //   // 4. Check that the confirmation message is shown.
  //   // 5. Click the "Confirm" button on the confirmation.
  //   // 6. Check that the element with the text "Deleting" is displayed.
  //   // 7. Wait until the element with the "Add" button is displayed.
  //   // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  // });
  
  

});