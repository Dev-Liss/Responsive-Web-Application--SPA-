import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { PropertyContext } from "../context/PropertyContext";
import {
  FaHeart,
  FaArrowLeft,
  FaBed,
  FaMapMarkerAlt,
  FaTag,
  FaCheck,
} from "react-icons/fa";

const PropertyDetails = () => {
  // Get ID, properties, and favorites context
  const { id } = useParams();
  const { properties, addToFavorites, favorites } = useContext(PropertyContext);
  const property = properties.find((p) => p.id === id);

  // Prepare array of image paths for the gallery
  const images = property
    ? [
        property.picture,
        ...Array.from({ length: 6 }, (_, i) => `images/${id}/${i + 1}.jpeg`),
      ]
    : [];

  // State to track which image is currently displayed in the large view
  const [mainImage, setMainImage] = useState(property ? property.picture : "");

  // If property not found, show error message
  if (!property) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Property not found</h2>
        <Link to="/">Back to Search</Link>
      </div>
    );
  }

  // Check if this property is already in the user's favorites list
  const isSaved = favorites.some((fav) => fav.id === property.id);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      {/* Navigation: Back to Search */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "#007bff",
          marginBottom: "20px",
        }}
      >
        <FaArrowLeft style={{ marginRight: "5px" }} /> Back to Search
      </Link>

      <div className="details-grid">
        {/* LEFT COLUMN: Image Gallery */}
        <div>
          {/* Main Large Image */}
          <img
            src={`${import.meta.env.BASE_URL}${mainImage}`}
            alt="Main View"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />

          {/* Thumbnail Grid (Responsive via CSS classes) */}
          <div className="thumbnail-grid">
            {images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`Thumbnail ${index}`}
                // Click handler: Update the main image state
                onClick={() => setMainImage(img)}
                // Error handler: Hide thumbnail if file is missing (cleaner UI)
                onError={(e) => (e.target.style.display = "none")}
                // Apply 'active' class if this is the selected image
                className={`thumbnail-img ${mainImage === img ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Property Details & Actions */}
        <div>
          <h1 style={{ marginTop: 0 }}>
            {property.type} in {property.location.split(",")[0]}
          </h1>
          <h2 style={{ color: "#28a745" }}>
            Rs.{property.price.toLocaleString()}
          </h2>

          <p style={{ fontSize: "1.1em", color: "#555" }}>
            <FaMapMarkerAlt /> {property.location}
          </p>

          <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
            <span>
              <FaBed /> {property.bedrooms} Bedrooms
            </span>
            <span>
              <FaTag /> {property.tenure}
            </span>
          </div>

          {/* Add to Favorites Button */}
          <button
            onClick={() => !isSaved && addToFavorites(property)}
            disabled={isSaved} // Disable if already saved
            style={{
              padding: "12px 24px",
              fontSize: "1em",
              background: isSaved ? "#28a745" : "#e83e8c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isSaved ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.3s",
            }}
          >
            {isSaved ? (
              <>
                <FaCheck /> Added to Favorites
              </>
            ) : (
              <>
                <FaHeart /> Save to Favorites
              </>
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION: Tabs for extra details */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        {/* Tab 1: Text Description */}
        <TabPanel>
          <div style={{ padding: "10px 0" }}>
            <h3>Property Description</h3>
            <p style={{ lineHeight: "1.6", fontSize: "1.1em" }}>
              {property.description}
            </p>
          </div>
        </TabPanel>

        {/* Tab 2: Floor Plan Image */}
        <TabPanel>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src={`${import.meta.env.BASE_URL}images/${id}/floorplan.jpeg`}
              alt="Floor Plan"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            {/* Fallback Message */}
            <p style={{ display: "none", color: "red" }}>
              Floor plan image not available for this property.
            </p>
          </div>
        </TabPanel>

        {/* Tab 3: Dynamic Google Map */}
        <TabPanel>
          <div style={{ marginTop: "20px" }}>
            <iframe
              title={`Map showing ${property.location}`}
              width="100%"
              height="400"
              style={{
                border: 0,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&output=embed`}
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
