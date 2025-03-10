import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../streamlistAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Movies() {
  const [movies, setMovies] = useState([]);
  const [cartMovies, setCartMovies] = useState(() => {
    const savedCart = localStorage.getItem('cartMovies');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    };

    getMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartMovies', JSON.stringify(cartMovies));
  }, [cartMovies]);

  const handleAddToCart = (movie) => {
    if (!cartMovies.some((m) => m.id === movie.id)) {
      setCartMovies([...cartMovies, movie]);
      toast.success(`${movie.title} added to cart successfully!`);   }
  };

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', height: '300px' }}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <button onClick={() => handleAddToCart(movie)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;