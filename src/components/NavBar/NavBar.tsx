import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className='container-fluid'>
        <span className="navbar-brand me-auto">Finance Tracker</span>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-transaction" className="nav-link">Add</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;