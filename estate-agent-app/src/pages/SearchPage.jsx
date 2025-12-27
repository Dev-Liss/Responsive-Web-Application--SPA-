import React, { useState, useContext, useEffect } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the widget
import { parsePropertyDate } from '../utils';
import PropertyCard from '../components/PropertyCard';
import FavoritesList from '../components/FavoritesList';

const SearchPage = () => {
    const { properties } = useContext(PropertyContext);
    const [filteredProperties, setFilteredProperties] = useState([]);
    
    // Search Criteria State
    const [type, setType] = useState("Any");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000000);
    const [minBed, setMinBed] = useState(1);
    const [maxBed, setMaxBed] = useState(10);
    const [postcode, setPostcode] = useState("");
    
    // Date Filter State (React Widget)
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    // Initial load: show all properties
    useEffect(() => {
        setFilteredProperties(properties);
    }, [properties]);

    // MAIN FILTERING LOGIC 
    const handleSearch = (e) => {
        e.preventDefault();

        const results = properties.filter(property => {
            // Type Check
            const typeMatch = type === "Any" || property.type === type;

            // Price Check
            const priceMatch = property.price >= parseInt(minPrice) && property.price <= parseInt(maxPrice);

            // Bedroom Check
            const bedMatch = property.bedrooms >= parseInt(minBed) && property.bedrooms <= parseInt(maxBed);

            // Postcode Check (First part match)
            const postcodeMatch = postcode === "" || property.location.toLowerCase().includes(postcode.toLowerCase());

            // Date Check 
            let dateMatch = true;
            const propDate = parsePropertyDate(property.added);
            
            if (dateFrom && dateTo) {
                // Between dates
                dateMatch = propDate >= dateFrom && propDate <= dateTo;
            } else if (dateFrom) {
                // After specified date
                dateMatch = propDate >= dateFrom;
            }

            // Combine all filters
            return typeMatch && priceMatch && bedMatch && postcodeMatch && dateMatch;
        });

        setFilteredProperties(results);
    };

    // CLEAR FILTERS
    const handleClear = () => {
        setFilteredProperties(properties);
        setType("Any");
        setMinPrice(0);
        setMaxPrice(2000000);
        setPostcode("");
        setDateFrom(null);
        setDateTo(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Find Your Dream Home</h1>
            
            {/* SEARCH FORM CONTAINER */}
            <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <form onSubmit={handleSearch}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        
                        {/* Type */}
                        <div>
                            <label>Property Type:</label>
                            <select style={{ width: '100%', padding: '8px' }} value={type} onChange={e => setType(e.target.value)}>
                                <option value="Any">Any</option>
                                <option value="House">House</option>
                                <option value="Flat">Flat</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label>Min Price: £{minPrice}</label>
                            <input type="range" min="0" max="2000000" step="50000" style={{ width: '100%' }}
                                value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                        </div>
                        <div>
                            <label>Max Price: £{maxPrice}</label>
                            <input type="range" min="0" max="2000000" step="50000" style={{ width: '100%' }}
                                value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                        </div>

                        {/* Bedrooms */}
                        <div>
                            <label>Bedrooms: {minBed} - {maxBed}</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="number" min="0" max="10" value={minBed} onChange={e => setMinBed(e.target.value)} style={{ width: '50px' }} />
                                <span>to</span>
                                <input type="number" min="0" max="10" value={maxBed} onChange={e => setMaxBed(e.target.value)} style={{ width: '50px' }} />
                            </div>
                        </div>

                        {/* Postcode */}
                        <div>
                            <label>Postcode Area (e.g. BR1):</label>
                            <input type="text" placeholder="Postcode..." value={postcode} onChange={e => setPostcode(e.target.value)} 
                                style={{ width: '100%', padding: '8px' }} />
                        </div>

                        {/* Date Widget */}
                        <div>
                            <label>Added After:</label>
                            <DatePicker selected={dateFrom} onChange={date => setDateFrom(date)} placeholderText="Select Date" className="date-picker-input" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                            Search Properties
                        </button>
                        <button type="button" onClick={handleClear} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Clear Filter
                        </button>
                    </div>
                </form>
            </div>

            {/* GRID LAYOUT: Results (Left) + Favorites (Right) */}
            <div className="search-layout">
                
                {/* LEFT: Search Results */}
                <div className="property-grid">
                    {filteredProperties.length === 0 ? <p>No properties found.</p> : 
                        filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    }
                </div>

                {/* RIGHT: Favorites Sidebar */}
                <div>
                    <FavoritesList />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;