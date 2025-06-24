import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import "@testing-library/jest-dom";

describe("Navbar Component", () => {
  it("renders the navbar with logo and menu items", () => {
    render(<Navbar />);

    expect(screen.getByText("AEON")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search documentation...")
    ).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger icon is clicked", () => {
    // Set mobile viewport
    global.innerWidth = 500;
    const { container } = render(<Navbar />);

    // Get hamburger button (second button in mobile view)
    const buttons = screen.getAllByRole("button");
    const hamburgerButton = buttons[1];

    // Click to open menu
    fireEvent.click(hamburgerButton);

    // Check if mobile menu is visible
    const mobileMenu = container.querySelector(".md\\:hidden.bg-white");
    expect(mobileMenu).toBeInTheDocument();
    expect(mobileMenu).toBeVisible();

    // Click to close menu
    fireEvent.click(hamburgerButton);

    // Check if mobile menu is removed from DOM or not visible
    const closedMobileMenu = container.querySelector(".md\\:hidden.bg-white");
    if (closedMobileMenu) {
      // If element still exists in DOM, check if it's hidden
      expect(closedMobileMenu).not.toBeVisible();
    } else {
      // If element is removed from DOM, that's also acceptable
      expect(closedMobileMenu).toBeNull();
    }
  });

  it("shows search input in mobile view when search icon is clicked", () => {
    // Set mobile viewport
    global.innerWidth = 500;
    const { container } = render(<Navbar />);

    // Get search button (first button in mobile view)
    const buttons = screen.getAllByRole("button");
    const searchButton = buttons[0];

    // Click search button to show mobile search
    fireEvent.click(searchButton);

    // Check if mobile search input is visible
    const mobileSearchContainer = container.querySelector(
      ".md\\:hidden.px-3.py-2"
    );
    expect(mobileSearchContainer).toBeInTheDocument();
    expect(mobileSearchContainer).toBeVisible();

    const mobileSearchInput = mobileSearchContainer.querySelector("input");
    expect(mobileSearchInput).toBeInTheDocument();
    expect(mobileSearchInput).toBeVisible();
  });
});
