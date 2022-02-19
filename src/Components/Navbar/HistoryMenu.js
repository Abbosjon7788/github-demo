import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const HistoryMenu = ({ setMenu }) => {
     const history = useHistory()
     const [data, setData] = useState(null)
     const [show, setShow] = useState(false)

     useEffect(() => {
          const localData = localStorage.getItem('users_name')
          const parsedData = JSON.parse(localData)
          setData(parsedData?.users.reverse())
     }, [])

     useEffect(() => {
          setTimeout(() => setShow(true), 1)
     }, [])

     const closeMenu = () => {
          setShow(false)
          setTimeout(() => setMenu(false), 200)
     }

     const clearHistory = () => {
          localStorage.clear()
     }

     return (
          <div className="history-menu">
               <div className={`${show ? 'show' : ''} menu-wrapper`}>
                    <span className="triangle"></span>
                    {data && <div className="clear-all-wrapper">
                         <span onClick={() => { closeMenu(); clearHistory() }} className="clear-all">Clear all</span>
                    </div>}
                    <div className={`menu`}>
                         <ul>
                              {
                                   data ? <>
                                        {
                                             data.length > 0 && data.map((item, index) => (
                                                  <li onClick={() => { closeMenu(); history.push(`/history/${item.name}`) }} key={index}>
                                                       <div className="img-wrapper">
                                                            <img src={item.image} alt="" />
                                                       </div>
                                                       <span>{item.name}</span>
                                                  </li>
                                             ))
                                        } </> :
                                        <p className="not-history">No history</p>
                              }
                         </ul>
                    </div>
               </div>
               <div className="paper" onClick={closeMenu}></div>
          </div>
     )
}

export default HistoryMenu
