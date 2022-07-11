import logo from '../logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import Home from './home/Home'
import Register from './register/Register'
import Catalog from './catalog/Catalog'
import Book from './book/Book';

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>GCU Library</h1>
        <div style={{backgroundColor: "aquamarine"}}> 
          <ul style={{listStyleType:"none"}}>
            <li className="nav">
              <Link to="/">Home</Link>
            </li>
            <li className="nav">
              <Link to="/catalog">Catalog</Link>
            </li>
            <li className="nav">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </div>
    );
  }
}

export default App;
