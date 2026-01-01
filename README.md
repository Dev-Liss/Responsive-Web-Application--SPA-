# 🏡 Estate Agent Client-Side Web Application

A responsive Single Page Application (SPA) built with **React** and **Vite**, designed to allow users to search, view, and manage property listings in Sri Lanka. This project demonstrates advanced client-side development techniques including global state management, drag-and-drop interactions, and dynamic filtering.

**🔗 Live Demo:** [https://Dev-Liss.github.io/Responsive-Web-Application--SPA-/](https://Dev-Liss.github.io/Responsive-Web-Application--SPA-/)

---

## ✨ Features

### 🔍 Advanced Property Search
- **Multi-criteria Filtering:** Filter properties by **Type** (House/Flat), **Price Range** (Min/Max), **Bedrooms**, **Location**, and **Date Added**.
- **Dynamic Results:** Real-time filtering logic updates the property grid instantly without page reloads.
- **Search Widget:** Integrated `react-datepicker` for intuitive date selection.

### 🏠 Property Details Page
- **Interactive Gallery:** Main image display with a responsive, scrollable thumbnail strip.
- **Tabbed Interface:** Organized content using `react-tabs` to switch between:
  - **Description:** Full property details.
  - **Floor Plan:** Property-specific floor plan images.
  - **Map:** Dynamic Google Maps embed based on the property's location query.
- **Responsive Layout:** Adaptive grid that stacks vertically on mobile devices.

### ❤️ Favorites Management (Drag & Drop)
- **Drag & Drop:** Powered by `react-dnd`. Users can drag property cards from the search results and drop them into the Favorites sidebar.
- **Context API:** Global state management ensures favorites persist across pages and prevents duplicates.
- **Management:** Users can remove individual items or clear the entire list with a single click.

### 📱 Fully Responsive Design
- **Mobile First:** Optimized for iPhone SE, iPad, and Desktop screens using CSS Media Queries.
- **CSS Grid & Flexbox:** Custom CSS handles complex layouts like the thumbnail wrapping and adaptive search grids.

---

## 🛠️ Tech Stack

- **Framework:** React (Vite)
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Styling:** CSS3 (Custom Grid/Flexbox)
- **Libraries:**
  - `react-dnd` & `react-dnd-html5-backend` (Drag and Drop)
  - `react-tabs` (Tabbed Content)
  - `react-datepicker` (Date Input)
  - `react-icons` (UI Icons)
- **Testing:** Jest & React Testing Library

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Dev-Liss/Responsive-Web-Application--SPA-.git](https://github.com/Dev-Liss/Responsive-Web-Application--SPA-.git)
   cd Responsive-Web-Application--SPA-
   ```
   
2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to http://localhost:5173

## 🧪 Testing

This project includes Jest unit tests to verify core component functionality.

To run the tests:
   ```bash
   npm test
   ```

Test Coverage:
- **Component Rendering:** Verifies that property details (Price, Location, Type) appear correctly.
- **User Interface:** Checks for the existence of critical action buttons ("View Details").
- **Mocking:** Uses Jest mocks for external libraries (`react-dnd`, `react-router-dom`) to ensure isolated UI testing.

## 📂 Project Structure
```Plaintext
src/
├── components/       # Reusable UI components (PropertyCard, NavBar, FavoritesList)
├── context/          # Global State (PropertyContext)
├── data/             # JSON Data (properties.json)
├── pages/            # Page Views (SearchPage, PropertyDetails)
├── App.jsx           # Main App Component (Routing & Providers)
├── index.css         # Global Styles & Responsive Media Queries
└── utils.js          # Helper functions
``` 

## 📝 License

This project is for educational purposes as part of the 5COSC026W module (University of Westminster).

**Author**: Lisara Mendis (Dev-Liss)
