// Import necessary dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Explore from "../components/Pref_Page/Explore";

// Sample travel tips data
const tips = [
  {
    id: 1,
    title: "Packing Essentials",
    description: "Pack lightweight clothes, comfortable shoes, and essential items for your trip.",
    img: "https://thetravelintern.com/wp-content/uploads/2018/06/Ultimate-Travel-Packing-List-35-Essential-Things-to-Pack-for-Long-Term-Travel-Travel-Packing-List.jpg.webp",
    url:"https://www.smartertravel.com/the-ultimate-packing-list/",
  },
  {
    id: 2,
    title: "Safety Tips",
    description: "Follow these 7 travel safety tips to help you take a trip that’s memorable for all the right reasons.",
    url: "https://www.nationwide.com/lc/resources/home/articles/travel-safety-tips",
    img: "https://www.bookmundi.com/_ipx/q_55,s_737x413/https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/travel-safety-tips-for-2018-1524819522-785X440.jpg"
  },
];

// Mock the window.open function
global.open = jest.fn();

describe("Explore component", () => {
  test("renders travel tips cards with correct data", () => {
    render(<Explore />);
    
    // Check if the Explore Travel Tips heading is present
    expect(screen.getByText("Explore Travel Tips")).toBeInTheDocument();

    // Check if all tips cards are rendered with correct titles and descriptions
    tips.forEach((tip) => {
      expect(screen.getByText(tip.title)).toBeInTheDocument();
      expect(screen.getByText(tip.description)).toBeInTheDocument();
    });

    // Check if images are rendered correctly for each tip
    tips.forEach((tip) => {
      if (tip.img) {
        expect(screen.getByAltText(tip.title)).toBeInTheDocument();
        expect(screen.getByAltText(tip.title).src).toContain(tip.img);
      }
    });
  });

  test("clicking on a tip card should open the provided URL in a new tab", () => {
    render(<Explore />);
    
    // Click on the first tip card which contains a URL
    fireEvent.click(screen.getByText(tips[0].title));

    // Check if window.open is called with the correct URL and target
    expect(global.open).toHaveBeenCalledWith(tips[0].url, "_blank");
  });
});
