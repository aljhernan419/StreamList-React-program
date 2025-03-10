import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Header from './components/Header';
import { Link } from 'react-router-dom';
import "./App.css";

function App() {
  return (
      <Router>
          <div className="App">
              <header>
                  <h1 className="app-title">EZ Tech Movies</h1>
                  <nav className="navbar">
                      <Link to="/" className="nav-button">
                          Home
                      </Link>
                      <Link to="/movies" className="nav-button">
                          Movies
                      </Link>
                      <Link to="/cart" className="nav-button">
                          Cart
                      </Link>
                      <Link to="/about" className="nav-button">
                          About
                      </Link>
                  </nav>
              </header>
              <main>
                  <Routes>
                      <Route path="/" element={<StreamList />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/about" element={<About />} />
                  </Routes>
              </main>
          </div>
      </Router>
  );
}

export default App;