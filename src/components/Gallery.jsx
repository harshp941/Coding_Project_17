import React, { useState } from 'react';

function Gallery({ tours, setTours }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://www.course-api.com/react-tours-project')
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTour = (id) => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  };

  const handleToggleDescription = (id) => {
    setTours(prevTours =>
      prevTours.map(tour =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  return (
    <div className="gallery">
      <button onClick={fetchTours} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Tours'}
      </button>

      {error && <p>Error: {error}</p>}

      {tours.map(tour => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>{tour.price}</p>
          <p>
            {tour.info}
            <button onClick={() => handleToggleDescription(tour.id)}>
              {tour.showMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => handleRemoveTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;