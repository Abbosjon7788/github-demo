import React, { useState, useEffect } from 'react'

const HistoryMenu = ({ setMenu }) => {
     const [data, setData] = useState(null)
     const [show, setShow] = useState(false)

     useEffect(() => {
          const localData = localStorage.getItem('users_name')
          const parsedData = JSON.parse(localData)
          setData(parsedData.users)
     }, [])

     useEffect(() => {
          setTimeout(() => setShow(true), 1)
     }, [])

     const closeMenu = () => {
          setShow(false)
          setTimeout(() => setMenu(false), 200)
     }

     return (
          <div className="history-menu">
               <div className={`${show ? 'show' : ''} menu-wrapper`}>
                    <span className="triangle"></span>
                    <div className={`menu`}>
                         <ul>
                              {
                                   data && data.map((item, index) => (
                                        <li onClick={closeMenu} key={index}>
                                             <div className="img-wrapper">
                                                  <img src={item.image} alt="" />
                                             </div>
                                             <span>{item.name}</span>
                                        </li>
                                   ))
                              }
                         </ul>
                    </div>
               </div>
               <div className="paper" onClick={closeMenu}></div>
          </div>
     )
}

export default HistoryMenu
