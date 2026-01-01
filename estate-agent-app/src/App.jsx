import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    // 1. PropertyProvider: Gives all pages access to JSON data & Favorites
    <PropertyProvider>
      {/* 2. DndProvider: Enables Drag and Drop functionality */}
      <DndProvider backend={HTML5Backend}>
        {/* 3. Router: Enables navigation between pages without reloading */}
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </Router>
      </DndProvider>
    </PropertyProvider>
  );
}

export default App;
