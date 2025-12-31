import React, { useState, useContext, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parsePropertyDate } from "../utils";
import PropertyCard from "../components/PropertyCard";
import FavoritesList from "../components/FavoritesList";

/**
 * SearchPage
 * The main homepage where users can filter and view properties.
 */
const SearchPage = () => {
  // Access global property data from our Context
  const { properties } = useContext(PropertyContext);

  // State to hold the results shown to the user
  const [filteredProperties, setFilteredProperties] = useState([]);

  // --- SEARCH FILTER STATES ---
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000000); // Default max: 500 Million LKR
  const [minBed, setMinBed] = useState(1);
  const [maxBed, setMaxBed] = useState(10);
  const [postcode, setPostcode] = useState("");

  // Date Picker States
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // Load all properties initially when the page starts
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  /**
   * handleSearch
   * Runs when the user clicks "Search Properties".
   * Filters the 'properties' array based on all selected criteria.
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    const results = properties.filter((property) => {
      // 1. Filter by Type (if "Any", match everything)
      const typeMatch = type === "Any" || property.type === type;

      // 2. Filter by Price (Check if within range)
      const priceMatch =
        property.price >= parseInt(minPrice) &&
        property.price <= parseInt(maxPrice);

      // 3. Filter by Bedrooms
      const bedMatch =
        property.bedrooms >= parseInt(minBed) &&
        property.bedrooms <= parseInt(maxBed);

      // 4. Filter by Location/Postcode (Case insensitive search)
      const postcodeMatch =
        postcode === "" ||
        property.location.toLowerCase().includes(postcode.toLowerCase());

      // 5. Filter by Date (using helper function parsePropertyDate)
      let dateMatch = true;
      const propDate = parsePropertyDate(property.added);

      if (dateFrom && dateTo) {
        // Match between two dates
        dateMatch = propDate >= dateFrom && propDate <= dateTo;
      } else if (dateFrom) {
        // Match after start date
        dateMatch = propDate >= dateFrom;
      }

      // Return TRUE only if ALL conditions match
      return typeMatch && priceMatch && bedMatch && postcodeMatch && dateMatch;
    });

    // Update the UI with the results
    setFilteredProperties(results);
  };

  /**
   * handleClear
   * Resets all filters to their default values
   */
  const handleClear = () => {
    setFilteredProperties(properties);
    setType("Any");
    setMinPrice(0);
    setMaxPrice(500000000);
    setPostcode("");
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>
        Find Your Dream Home in Sri Lanka
      </h1>

      {/* --- SEARCH FORM (White Card) --- */}
      <div className="search-card">
        <form onSubmit={handleSearch}>
          <div className="search-grid">
            {/* Type Selector */}
            <div className="form-group">
              <label>Property Type</label>
              <select
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Any">Any Type</option>
                <option value="House">House</option>
                <option value="Flat">Flat / Apartment</option>
              </select>
            </div>

            {/* Min Price Slider */}
            <div className="form-group">
              <label>
                Min Price: Rs. {parseInt(minPrice).toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="500000000"
                step="1000000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            {/* Max Price Slider */}
            <div className="form-group">
              <label>
                Max Price: Rs. {parseInt(maxPrice).toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="500000000"
                step="1000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {/* Bedroom Number Inputs */}
            <div className="form-group">
              <label>
                Bedrooms: {minBed} - {maxBed}
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="10"
                  value={minBed}
                  onChange={(e) => setMinBed(e.target.value)}
                />
                <span style={{ alignSelf: "center" }}>to</span>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="10"
                  value={maxBed}
                  onChange={(e) => setMaxBed(e.target.value)}
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="form-group">
              <label>Location</label>
              <input
                className="form-control"
                type="text"
                placeholder="e.g. Colombo 07"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div className="form-group">
              <label>Added After</label>
              <div style={{ width: "100%" }}>
                <DatePicker
                  selected={dateFrom}
                  onChange={(date) => setDateFrom(date)}
                  placeholderText="Select Date"
                  className="date-picker-input"
                  wrapperClassName="date-picker-wrapper"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="submit" className="btn-search">
              Search Properties
            </button>
            <button type="button" onClick={handleClear} className="btn-clear">
              Clear Filter
            </button>
          </div>
        </form>
      </div>

      {/* --- RESULTS AREA --- */}
      <div className="search-layout">
        {/* Left Column: Properties */}
        <div className="property-grid">
          {filteredProperties.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "40px",
                color: "#777",
              }}
            >
              <h3>No properties found matching your criteria.</h3>
              <p>Try adjusting your price range or location.</p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>

        {/* Right Column: Drag & Drop Favorites */}
        <div>
          <FavoritesList />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
