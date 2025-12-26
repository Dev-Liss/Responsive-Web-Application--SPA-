import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import NavBar from './components/NavBar';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <PropertyProvider>
      <Router>
        <NavBar />
        <Routes>
          {/* Route for the Search Page (Home) */}
          <Route path="/" element={<SearchPage />} />
          
          {/* Route for Property Details (Dynamic ID) */}
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </PropertyProvider>
  );
}

export default App;