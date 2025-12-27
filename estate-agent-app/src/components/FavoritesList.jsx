import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { PropertyContext } from '../context/PropertyContext';
import { FaTrash } from 'react-icons/fa';

// FavoritesList Component
const FavoritesList = () => {
    const { favorites, removeFromFavorites, clearFavorites, addToFavorites, properties } = useContext(PropertyContext);

    // Hook to make this component a drop target
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PROPERTY',
        drop: (item) => {
            const property = properties.find(p => p.id === item.id);
            if (property) {
                addToFavorites(property);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [properties, favorites]); 

    return (
        <div 
            // Drop target container
            ref={drop} 
            style={{ 
                border: '2px dashed #007bff', 
                borderRadius: '8px', 
                padding: '15px', 
                background: isOver ? '#e9ecef' : '#f8f9fa',
                minHeight: '300px'
            }}
        >
            <h3>Favorites ({favorites.length})</h3>
            <p style={{ fontSize: '0.9em', color: '#666' }}>Drag properties here</p>
            
            {/* Favorites List */}
            {favorites.length === 0 ? <p>No favorites yet.</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {/* Render each favorite property */}
                    {favorites.map(fav => (
                        <li key={fav.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{fav.type} - £{fav.price?.toLocaleString()}</span>
                                <button onClick={() => removeFromFavorites(fav.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Clear All Favorites Button */}
            {favorites.length > 0 && (
                <button onClick={clearFavorites} style={{ marginTop: '10px', padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    Clear All
                </button>
            )}
        </div>
    );
};

export default FavoritesList;