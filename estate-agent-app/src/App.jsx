import propertiesData from './data/properties.json';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Project Phase 1: Setup Complete</h1>
      <h3>Properties Loaded: {propertiesData.properties.length} / 7</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {propertiesData.properties.map(property => (
            <div key={property.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <img src={`/images/${property.id}/main.jpeg`} alt={property.type} style={{ width: '100%' }} />
              <h4>{property.location}</h4>
              <p>£{property.price.toLocaleString()}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;