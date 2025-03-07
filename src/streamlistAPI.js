// src/streamlistAPI.js

import axios from 'axios';

const API_KEY = 'your_tmdb_api_key'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  try {
    // Fetch popular movies
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    
    // Return the results from the API
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    // Fetch movie details using the movieId
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
