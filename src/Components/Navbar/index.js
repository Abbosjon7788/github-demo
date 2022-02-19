import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
     return (
          <div className="navbar">
               <Link to="/" className="home-menu">
                    <div className="logo-wrapper">
                         <img src="/assets/images/github-logo.svg" alt="" />
                    </div>
                    <p>Github</p>
               </Link>
               <Link to="/history" className="history-link">History</Link>
          </div>
     )
}

export default React.memo(Navbar)
