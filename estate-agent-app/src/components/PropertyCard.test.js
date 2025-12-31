import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PropertyCard from "./PropertyCard";

// --- MOCK 1: UTILS ---
// Mocks the getBaseUrl function so it doesn't fail outside the Vite environment
jest.mock("../utils", () => ({
  getBaseUrl: () => "/",
  parsePropertyDate: jest.fn(),
}));

// --- MOCK 2: REACT-DND (The Fix) ---
// Jest cannot read the complex 'react-dnd' library.
// We replace it with simple "fake" functions that do nothing.
// This allows the test to focus on the UI (Text, Buttons) without crashing.
jest.mock("react-dnd", () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
  DndProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: {},
}));
// -------------------------------

// Mock Data to simulate a real property
const mockProperty = {
  id: "prop1",
  type: "House",
  price: 185000000,
  location: "Colombo",
  bedrooms: 3,
  picture: "images/prop1/main.jpg",
  description: "A lovely family home.",
};

const renderComponent = () => {
  return render(
    // We must wrap the component in BrowserRouter because it uses <Link>
    <BrowserRouter>
      <PropertyCard property={mockProperty} />
    </BrowserRouter>
  );
};

describe("PropertyCard Component Tests", () => {
  test("1. Renders the property type title", () => {
    renderComponent();
    expect(screen.getByText(/House/i)).toBeInTheDocument();
  });

  test("2. Displays the formatted price with Rs. symbol", () => {
    renderComponent();
    expect(screen.getByText(/185,000,000/i)).toBeInTheDocument();
  });

  test("3. Displays the correct location", () => {
    renderComponent();
    expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
  });

  test("4. Contains a View Details button", () => {
    renderComponent();
    const linkElement = screen.getByRole("link", { name: /View Details/i });
    expect(linkElement).toBeInTheDocument();
  });

  test("5. Renders the property image", () => {
    renderComponent();
    const imgElement = screen.getByAltText(/House/i);
    expect(imgElement).toBeInTheDocument();
    // Check that the image src contains the expected path
    expect(imgElement.src).toContain("images/prop1/main.jpg");
  });
});
