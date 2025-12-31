import { createContext, useState, useEffect } from "react";
import propertiesData from "../data/properties.json";

/**
 * PropertyContext
 * This creates a "Global State" storage space.
 * Any component in our app can access the data stored here.
 */
export const PropertyContext = createContext();

/**
 * PropertyProvider
 * This component wraps our entire application (in App.jsx).
 * It provides the 'properties' and 'favorites' data to all children.
 */
export const PropertyProvider = ({ children }) => {
  // STATE: Stores the list of all properties loaded from JSON
  const [properties, setProperties] = useState([]);

  // STATE: Stores the list of properties the user has "Favorited"
  const [favorites, setFavorites] = useState([]);

  // EFFECT: Runs once when the app loads.
  // It fetches the data from our local JSON file and saves it to state.
  useEffect(() => {
    if (propertiesData && propertiesData.properties) {
      setProperties(propertiesData.properties);
    }
  }, []);

  /**
   * Adds a property to the favorites list.
   * Includes a check to prevent adding duplicates.
   * @param {Object} property - The property object to add
   */
  const addToFavorites = (property) => {
    // Check if property is ALREADY in the list
    const isAlreadyFavorite = favorites.find((fav) => fav.id === property.id);

    if (!isAlreadyFavorite) {
      // If not, create a new array with the old favorites + the new one
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

  /**
   * Clears all favorites.
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  // We return the Provider with all the data and functions attached
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
