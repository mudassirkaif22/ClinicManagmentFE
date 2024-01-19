import React from 'react'
import {NavLink} from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" >
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/drlogin">Dr. John Snow</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link navbar-brand fs-3" aria-current="page">Home</NavLink>
              {/* <a className="nav-link navbar-brand fs-3 text-danger active" aria-current="page" href="/">Home</a> */}
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link navbar-brand fs-3" aria-current="page">Contact</NavLink>
              {/* <a className="nav-link navbar-brand fs-3 active" href="Contact.js">Contact</a> */}
            </li>
            {/* <li className="nav-item">
              <NavLink to="/admin" className="nav-link navbar-brand fs-3" aria-current="page">Adminstration</NavLink>
              <a className="nav-link navbar-brand fs-3 active" href="Contact.js">Contact</a>
            </li> */}
          </ul>

    </div>
  </div>
</nav>
  )
}
