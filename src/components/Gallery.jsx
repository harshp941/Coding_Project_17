import React, { useState, useEffect } from 'react';

function Gallery({ tours, setTours }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {    // useEffect is used to fetch the API and JSON
    const fetchTours = async () => {
      try {
        const response = await fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project'); // Had to make alterations to link because it would pop an error before
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

    fetchTours();
  }, [setTours]);

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
// these are the loading and error states 
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="gallery">
      {tours.map(tour => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>{tour.price}</p>
          <p>
            {tour.showMore ? tour.description : `${tour.description.substring(0, 100)}...`}
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