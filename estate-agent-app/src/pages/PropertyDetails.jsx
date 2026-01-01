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

/**
 * PropertyDetails Page
 * Displays full information about a specific property.
 * Uses URL parameters (id) to find the right house.
 */
const PropertyDetails = () => {
  // 1. Get the 'id' from the URL (e.g. /property/prop1)
  const { id } = useParams();

  // 2. Get global data to find the specific property
  const { properties, addToFavorites, favorites } = useContext(PropertyContext);

  const property = properties.find((p) => p.id === id);

  // 3. Create a list of images (Main picture + thumbnails)
  const images = property
    ? [
        property.picture, // The main image from JSON
        ...Array.from({ length: 6 }, (_, i) => `images/${id}/${i + 1}.jpeg`),
      ]
    : [];

  // State for the currently selected large image
  const [mainImage, setMainImage] = useState(property ? property.picture : "");

  // Safety Check: If someone types a wrong ID in URL
  if (!property) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Property not found</h2>
        <Link to="/">Back to Search</Link>
      </div>
    );
  }

  // Check if this property is already in favorites
  const isSaved = favorites.some((fav) => fav.id === property.id);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      {/* Back Button */}
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
          <img
            src={`${import.meta.env.BASE_URL}${mainImage}`}
            alt="Main"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
          {/* Thumbnail Strip */}
          <div style={{ display: "flex", gap: "10px" }}>
            {images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`Thumbnail ${index}`}
                onClick={() => setMainImage(img)}
                onError={(e) => (e.target.style.display = "none")}
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border:
                    mainImage === img ? "3px solid #007bff" : "1px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Key Details & Actions */}
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

          {/* SAVE BUTTON (Changes color if already saved) */}
          <button
            onClick={() => !isSaved && addToFavorites(property)}
            disabled={isSaved}
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

      {/* BOTTOM SECTION: Tabs (Description, Floor Plan, Map) */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        {/* Tab 1: Description */}
        <TabPanel>
          <div style={{ padding: "10px 0" }}>
            <h3>Property Description</h3>
            <p style={{ lineHeight: "1.6", fontSize: "1.1em" }}>
              {property.description}
            </p>
          </div>
        </TabPanel>

        {/* Tab 2: Specific Floor Plan */}
        <TabPanel>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              // DYNAMIC PATH: Looks for 'floorplan.jpeg' inside the specific property ID folder
              src={`${import.meta.env.BASE_URL}images/${id}/floorplan.jpeg`}
              alt="Floor Plan"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              // Fallback: this hides the broken image icon
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            {/* Fallback Text (Hidden by default) */}
            <p style={{ display: "none", color: "red" }}>
              Floor plan image not found. Please ensure 'public/images/{id}
              /floorplan.jpeg' exists.
            </p>
          </div>
        </TabPanel>

        {/* Tab 3: Dynamic Map using OpenStreetMap */}
        <TabPanel>
          <div style={{ marginTop: "20px" }}>
            <iframe
              title={`Map showing ${property.location}`}
              width="100%"
              height="450"
              style={{ border: 0 }}

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