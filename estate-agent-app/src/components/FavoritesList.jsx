import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { PropertyContext } from "../context/PropertyContext";
import { FaTrash } from "react-icons/fa";

/**
 * FavoritesList
 * A Drop Target sidebar where users can drag properties to save them.
 */
const FavoritesList = () => {
  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    addToFavorites,
    properties,
  } = useContext(PropertyContext);

  /**
   * useDrop Hook (React DnD)
   * Makes this component able to accept dropped items.
   */
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "PROPERTY", // Must match the 'type' in PropertyCard
      drop: (item) => {
        // Find the full property object using the ID
        const property = properties.find((p) => p.id === item.id);
        if (property) {
          addToFavorites(property);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(), // True - user is hovering a card over this box
      }),
    }),
    [properties, favorites]
  );

  return (
    <div
      ref={drop} // Connects the drop logic
      style={{
        border: "2px dashed #007bff",
        borderRadius: "8px",
        padding: "15px",
        background: isOver ? "#e9ecef" : "#f8f9fa",
        minHeight: "300px",
      }}
    >
      <h3>Favorites ({favorites.length})</h3>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Drag properties here to save
      </p>

      {/* List of Favorites */}
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map((fav) => (
            <li
              key={fav.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.9em" }}>
                  <strong>{fav.type}</strong>
                  <br />
                  Rs. {fav.price?.toLocaleString()}
                </div>
                <button
                  onClick={() => removeFromFavorites(fav.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                  }}
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Clear All Button */}
      {favorites.length > 0 && (
        <button
          onClick={clearFavorites}
          style={{
            marginTop: "10px",
            padding: "8px 10px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FavoritesList;
