import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils";

const PropertyCard = ({ property }) => {
  // Make this component draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY", // Identifies what is dragging
    item: { id: property.id }, // The data send when dragged
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag} // Connects the drag logic to this div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1, // Visual feedback when dragging
        cursor: "move",
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
