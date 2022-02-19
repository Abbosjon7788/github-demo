import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryMenu from './HistoryMenu'

const Navbar = () => {
     const [menu, setMenu] = useState(false)

     return (
          <div className="navbar">
               <Link to="/" className="home-menu">
                    <div className="logo-wrapper">
                         <img src="/assets/images/github-logo.svg" alt="" />
                    </div>
                    <p>Github</p>
               </Link>
               <div className="history-link-wrapper">
                    <div onClick={() => setMenu(true)} className="history-link">History</div>
                    {menu && <HistoryMenu setMenu={setMenu} />}
               </div>
          </div>
     )
}

export default React.memo(Navbar)
