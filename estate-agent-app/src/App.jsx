import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import NavBar from "./components/NavBar";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <PropertyProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <NavBar />
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
