import React, { useState, useContext, useEffect } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parsePropertyDate } from '../utils';
import PropertyCard from '../components/PropertyCard';
import FavoritesList from '../components/FavoritesList';

const SearchPage = () => {
    const { properties } = useContext(PropertyContext);
    const [filteredProperties, setFilteredProperties] = useState([]);
    
    // Search Criteria State
    const [type, setType] = useState("Any");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000000); 
    const [minBed, setMinBed] = useState(1);
    const [maxBed, setMaxBed] = useState(10);
    const [postcode, setPostcode] = useState("");
    
    // Date Filter State
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    useEffect(() => {
        setFilteredProperties(properties);
    }, [properties]);

    const handleSearch = (e) => {
        e.preventDefault();
        const results = properties.filter(property => {
            const typeMatch = type === "Any" || property.type === type;
            const priceMatch = property.price >= parseInt(minPrice) && property.price <= parseInt(maxPrice);
            const bedMatch = property.bedrooms >= parseInt(minBed) && property.bedrooms <= parseInt(maxBed);
            const postcodeMatch = postcode === "" || property.location.toLowerCase().includes(postcode.toLowerCase());
            
            let dateMatch = true;
            const propDate = parsePropertyDate(property.added);
            if (dateFrom && dateTo) {
                dateMatch = propDate >= dateFrom && propDate <= dateTo;
            } else if (dateFrom) {
                dateMatch = propDate >= dateFrom;
            }
            return typeMatch && priceMatch && bedMatch && postcodeMatch && dateMatch;
        });
        setFilteredProperties(results);
    };

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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Find Your Dream Home in Sri Lanka</h1>
            
            {/* SEARCH FORM CONTAINER (Styled with CSS class) */}
            <div className="search-card">
                <form onSubmit={handleSearch}>
                    <div className="search-grid">
                        
                        {/* Type */}
                        <div className="form-group">
                            <label>Property Type</label>
                            <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
                                <option value="Any">Any Type</option>
                                <option value="House">House</option>
                                <option value="Flat">Flat / Apartment</option>
                            </select>
                        </div>

                        {/* Price Range (Min) */}
                        <div className="form-group">
                            <label>Min Price: Rs. {parseInt(minPrice).toLocaleString()}</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="500000000" 
                                step="1000000" 
                                value={minPrice} 
                                onChange={e => setMinPrice(e.target.value)} 
                            />
                        </div>

                        {/* Price Range (Max) */}
                        <div className="form-group">
                            <label>Max Price: Rs. {parseInt(maxPrice).toLocaleString()}</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="500000000" 
                                step="1000000" 
                                value={maxPrice} 
                                onChange={e => setMaxPrice(e.target.value)} 
                            />
                        </div>

                        {/* Bedrooms */}
                        <div className="form-group">
                            <label>Bedrooms: {minBed} - {maxBed}</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input className="form-control" type="number" min="0" max="10" value={minBed} onChange={e => setMinBed(e.target.value)} />
                                <span style={{ alignSelf: 'center' }}>to</span>
                                <input className="form-control" type="number" min="0" max="10" value={maxBed} onChange={e => setMaxBed(e.target.value)} />
                            </div>
                        </div>

                        {/* Postcode */}
                        <div className="form-group">
                            <label>Location</label>
                            <input className="form-control" type="text" placeholder="e.g. Colombo 07" value={postcode} onChange={e => setPostcode(e.target.value)} />
                        </div>

                        {/* Date Widget */}
                        <div className="form-group">
                            <label>Added After</label>
                            {/* Wrapper div to fix DatePicker width issues */}
                            <div style={{ width: '100%' }}>
                                <DatePicker 
                                    selected={dateFrom} 
                                    onChange={date => setDateFrom(date)} 
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

            {/* GRID LAYOUT */}
            <div className="search-layout">
                <div className="property-grid">
                    {filteredProperties.length === 0 ? 
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#777' }}>
                            <h3>No properties found matching your criteria.</h3>
                            <p>Try adjusting your price range or location.</p>
                        </div> 
                    : 
                        filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    }
                </div>

                <div>
                    <FavoritesList />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;