import React, { createContext, useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';

// Create the Context (The "Container" for property data)
export const PropertyContext = createContext();

// Create the Provider (Component that provides data to children)
export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Load JSON data when the app starts
    useEffect(() => {
        setProperties(propertiesData.properties);
    }, []);

    // Function to add a property to favorites
    const addToFavorites = (property) => {
        // Check if already in favorites
        if (!favorites.find(fav => fav.id === property.id)) {
            setFavorites([...favorites, property]);
        }
    };

    // Function to remove from favorites 
    const removeFromFavorites = (propertyId) => {
        setFavorites(favorites.filter(fav => fav.id !== propertyId));
    };
    
    // Function to clear all favorites 
    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <PropertyContext.Provider value={{ 
            properties, 
            favorites, 
            addToFavorites, 
            removeFromFavorites,
            clearFavorites 
        }}>
            {children}
        </PropertyContext.Provider>
    );
};