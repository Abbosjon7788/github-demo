import React, { useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const SearchContent = () => {
     const [text, setText] = useState('')

     // const submit = (e) => {
     //      e.preventDefault()
     // }

     return (
          <div className="search-content">
               <div className={`${text && 'active'} search-btn`}>
                    <input type="text" onChange={(e) => setText(e.target.value)} placeholder="Search user..." />
                    <div className="icon-wrapper">
                         <IoSearchOutline className="search-icon" />
                    </div>
               </div>
               <div className="found-users-wrapper">
                    <ul className="found-users">
                         {
                              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(item => (
                                   <li key={item}>
                                        <div>
                                             <div className="user-login">
                                                  <label>Login:</label>
                                                  <span>UzCoderYouTube</span>
                                             </div>
                                             <div className="user-name">
                                                  <label>Name:</label>
                                                  <span>Abbosjon Siddikov</span>
                                             </div>
                                        </div>
                                        <div className="user-followers">
                                             <label>Followers:</label>
                                             <span>23</span>
                                        </div>
                                   </li>
                              ))
                         }
                    </ul>
               </div>
          </div>
     )
}

export default SearchContent
