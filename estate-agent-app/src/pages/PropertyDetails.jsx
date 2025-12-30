import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PropertyContext } from '../context/PropertyContext';
import { FaHeart, FaArrowLeft, FaBed, FaMapMarkerAlt, FaTag, FaCheck } from 'react-icons/fa'; // Added FaCheck

const PropertyDetails = () => {
    const { id } = useParams();
    // 1. Get 'favorites' from context to check if this item is already saved
    const { properties, addToFavorites, favorites } = useContext(PropertyContext);
    
    const property = properties.find(p => p.id === id);

    // Dynamic Image List
    const images = property ? [
        property.picture,
        `images/${id}/1.jpeg`,
        `images/${id}/2.jpeg`
    ] : [];

    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    if (!property) {
        return <div style={{ padding: '20px' }}><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;
    }

    // Checking if this property is currently in the favorites list
    const isSaved = favorites.some(fav => fav.id === property.id);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#007bff', marginBottom: '20px' }}>
                <FaArrowLeft style={{ marginRight: '5px' }} /> Back to Search
            </Link>

            <div className="details-grid">
                
                {/* LEFT: Image Gallery */}
                <div>
                    <img src={`${import.meta.env.BASE_URL}${mainImage}`} alt="Main" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {images.map((img, index) => (
                        <img 
                            key={index} 
                            src={`${import.meta.env.BASE_URL}${img}`} 
                            alt={`Thumbnail ${index}`} 
                            onClick={() => setMainImage(img)} 
                            style={{ 
                                width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer', borderRadius: '4px', 
                                border: mainImage === img ? '3px solid #007bff' : '1px solid #ddd' 
                            }} 
                        />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Key Details & Actions */}
                <div>
                    <h1 style={{ marginTop: 0 }}>{property.type} in {property.location.split(',')[0]}</h1>
                    <h2 style={{ color: '#28a745' }}>Rs.{property.price.toLocaleString()}</h2>
                    
                    <p style={{ fontSize: '1.1em', color: '#555' }}>
                        <FaMapMarkerAlt /> {property.location}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                        <span><FaBed /> {property.bedrooms} Bedrooms</span>
                        <span><FaTag /> {property.tenure}</span>
                    </div>

                    {/* 3. CONDITIONAL BUTTON RENDER */}
                    <button 
                        onClick={() => !isSaved && addToFavorites(property)} // Prevent adding twice if clicked again
                        disabled={isSaved} // Optional: Disable click if already saved
                        style={{ 
                            padding: '12px 24px', 
                            fontSize: '1em', 
                            // Change color based on state: Green (Saved) vs Pink (Default)
                            background: isSaved ? '#28a745' : '#e83e8c', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: isSaved ? 'default' : 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            transition: 'background 0.3s' // Color transition
                        }}
                    >
                        {/* Change Icon and Text based on state */}
                        {isSaved ? (
                            <><FaCheck /> Added to Favorites</>
                        ) : (
                            <><FaHeart /> Save to Favorites</>
                        )}
                    </button>
                </div>
            </div>

            {/* BOTTOM SECTION: React Tabs */}
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Google Map</Tab>
                </TabList>

                <TabPanel>
                    <h3>Property Description</h3>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1em' }}>{property.description}</p>
                </TabPanel>
                
                <TabPanel>
                    <h3>Floor Plan</h3>
                    <div style={{ background: '#eee', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: '#888' }}>Floor Plan Image would go here</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <h3>Location Map</h3>
                    <div style={{ background: '#eee', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: '#888' }}>Google Map Embed would go here</p>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PropertyDetails;