import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accommodation from "../components/Pref_Page/Accommodation";

describe("Accommodation component", () => {
  test("updating latitude-longitude input should update state", () => {
    // Render the component
    render(<Accommodation tripId="test-trip-id" />);

    // Find the latitude-longitude input field
    const latLongInput = screen.getByLabelText("Lat-Long");

    // Simulate change event on the input field
    fireEvent.change(latLongInput, { target: { value: "37.51,127.09" } });

    // Find the Submit button
    const submitButton = screen.getByText("Submit");

    // Click the Submit button
    fireEvent.click(submitButton);

    // Get the updated state of accommodations
    const updatedAccommodations = screen.getByTestId("updated-accommodations").textContent;
    const expectedAccommodations = JSON.stringify([
      {
        hotelName: "",
        location: "",
        checkInDateTime: null,
        checkOutDateTime: null,
        latLong: "37.51,127.09",
      },
    ]);

    // Check if the state is updated correctly
    expect(updatedAccommodations).toBe(expectedAccommodations);
  });
});
