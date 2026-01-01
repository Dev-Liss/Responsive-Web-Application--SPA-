import { createContext, useState, useEffect } from "react";
import propertiesData from "../data/properties.json";

// Creates a "Global State" storage space.
export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  // Properties list State
  const [properties, setProperties] = useState([]);

  // Favorites list State
  const [favorites, setFavorites] = useState([]);

  // EFFECT: Runs once when the app loads.
  // It fetches the data from our local JSON file and saves it to state.
  useEffect(() => {
    if (propertiesData && propertiesData.properties) {
      setProperties(propertiesData.properties);
    }
  }, []);

  /**
   * Adds a property to the favorites list, avoiding duplicates.
   * @param {Object} property - The property object to add
   */
  const addToFavorites = (property) => {
    const isAlreadyFavorite = favorites.find((fav) => fav.id === property.id);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, property]);
    }
  };

  /**
   * Removes a property from the favorites list by ID.
   * @param {string} propertyId - The ID of the property to remove
   */
  const removeFromFavorites = (propertyId) => {
    // .filter returns a new list containing only items that do NOT match the ID
    setFavorites(favorites.filter((fav) => fav.id !== propertyId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // Return the Provider with all the data and functions attached
  return (
    <PropertyContext.Provider
      value={{
        properties,
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
