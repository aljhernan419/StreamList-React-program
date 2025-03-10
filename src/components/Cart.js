// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import "../Cart.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
  // Retrieve the cart data from localStorage and set it in the state
  const [cartMovies, setCartMovies] = useState(() => {
    const savedCart = localStorage.getItem('cartMovies');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart data to localStorage whenever the cartMovies state changes
  useEffect(() => {
    localStorage.setItem('cartMovies', JSON.stringify(cartMovies));
  }, [cartMovies]);

  const handleRemoveMovie = (movieId) => {
    const updatedCart = cartMovies.filter(movie => movie.id !== movieId);
    setCartMovies(updatedCart);
    toast.success("Movie removed from cart successfully!");
  };

  const handleClearCart = () => {
    setCartMovies([]);
    toast.success("Cart cleared successfully!");
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartMovies.length === 0 ? (
        <p>No movies in your cart. Add some movies from the Movies page.</p>
      ) : (
        <div>
          <button onClick={handleClearCart}>Clear Cart</button>
          <div className="movie-list">
            {cartMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '200px', height: '300px' }}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <button onClick={() => handleRemoveMovie(movie.id)}>Remove from Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;