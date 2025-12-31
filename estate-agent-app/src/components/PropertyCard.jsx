import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils";

/**
 * PropertyCard
 * Displays a single property and allows it to be dragged.
 * @param {Object} property - The property data to display
 */
const PropertyCard = ({ property }) => {
  /**
   * useDrag Hook (React DnD)
   * This makes the component draggable.
   */
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY", // Identifies this item type to the Drop Target
    item: { id: property.id }, // The data sent when dragged (we just need ID)
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Updates opacity when being dragged
    }),
  }));

  return (
    <div
      ref={drag} // Attaches the drag logic to this DIV
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1, // Fade out slightly when dragging
        cursor: "move", // Show 'move' cursor to indicate draggable
        background: "white",
      }}
    >
      <img
        src={`${getBaseUrl()}${property.picture}`}
        alt={property.type}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "15px" }}>
        <h3>
          {property.type} - Rs.{property.price.toLocaleString()}
        </h3>
        <p style={{ color: "#666" }}>{property.location}</p>
        <p>{property.bedrooms} Bedrooms</p>
        {/* Truncate description to keep cards uniform size */}
        <p style={{ fontSize: "0.9em", color: "#888" }}>
          {property.description.substring(0, 80)}...
        </p>
        <Link to={`/property/${property.id}`} className="btn-view">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
