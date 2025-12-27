import React, { createContext, useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    // Initialize properties and favorites
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Load data from JSON when the app starts
    useEffect(() => {
        // Check if the JSON has the "properties" key
        if (propertiesData && propertiesData.properties) {
            setProperties(propertiesData.properties);
        }
    }, []);

    // Add to Favorites (prevent duplicates)
    const addToFavorites = (property) => {
        if (!favorites.find(fav => fav.id === property.id)) {
            setFavorites([...favorites, property]);
        }
    };

    // Remove from Favorites
    const removeFromFavorites = (propertyId) => {
        setFavorites(favorites.filter(fav => fav.id !== propertyId));
    };
    
    // Clear all Favorites
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