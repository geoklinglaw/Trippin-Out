import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar"; // Replace with the correct path
import firebase from "../components"
// Mock external dependencies
jest.mock(firebase, () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => ({
          exists: true,
          data: () => ({ username: "test_user" }),
        })),
      })),
    })),
  },
  auth: {
    currentUser: {
      uid: "user-123",
    },
  },
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

describe("Sidebar component", () => {
  it("should render the sidebar with user's username", () => {
    render(<Sidebar setHeader={() => {}} isAccommodationSubmitted={true} isPreferencesSubmitted={true} currentStep={0} />);
    expect(screen.getByText("test_user")).toBeInTheDocument();
  });

  it("should notify when proceeding to Preferences without submitting accommodation details", () => {
    render(<Sidebar setHeader={() => {}} isAccommodationSubmitted={false} isPreferencesSubmitted={true} currentStep={1} />);
    fireEvent.click(screen.getByText("Preferences"));
    expect(screen.getByText("Submit your accommodation details before accessing preferences!")).toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();
  });

  it("should notify when proceeding to Locations/Food Options without submitting preferences", () => {
    render(<Sidebar setHeader={() => {}} isAccommodationSubmitted={true} isPreferencesSubmitted={false} currentStep={2} />);
    fireEvent.click(screen.getByText("Locations"));
    fireEvent.click(screen.getByText("Food Options"));
    expect(screen.getByText("Submit your preferences first before accessing the locations and food options!")).toBeInTheDocument();
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
  });

  it("should proceed to other steps without notifying when conditions are met", () => {
    render(<Sidebar setHeader={() => {}} isAccommodationSubmitted={true} isPreferencesSubmitted={true} currentStep={0} />);
    fireEvent.click(screen.getByText("Explore"));
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Accomodation"));
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Preferences"));
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Locations"));
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Food Options"));
    expect(screen.queryByText("Submit your accommodation details before accessing preferences!")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit your preferences first before accessing the locations and food options!")).not.toBeInTheDocument();
  });
});
