import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
  <nav className="navbar navbar-expand-lg" style={{background:'#18122B', border:'none', boxShadow:'none', marginBottom:'2.5rem'}}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" style={{color:'#a78bfa', fontWeight:700, fontSize:'1.5rem', letterSpacing:'-1px'}} to="/">● CivicReport</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav mb-2 mb-lg-0" style={{gap:'1.2rem'}}>
            <li className="nav-item">
              <Link className="nav-link" style={{color:'#a78bfa', fontWeight:500}} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color:'#a78bfa', fontWeight:700, fontSize:'1.08rem', letterSpacing:'0.5px'}} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color:'#38bdf8', fontWeight:700, fontSize:'1.08rem', letterSpacing:'0.5px'}} to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
