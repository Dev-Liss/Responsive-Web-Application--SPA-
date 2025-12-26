import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Property Details Page Component
const PropertyDetails = () => {
  const { id } = useParams(); // This grabs "prop1" from the URL

  return (
    <div style={{ padding: '20px' }}>
      <h1>Property Details for ID: {id}</h1>
      <Link to="/" style={{ color: 'blue' }}>&larr; Back to Search</Link>
    </div>
  );
};

export default PropertyDetails;