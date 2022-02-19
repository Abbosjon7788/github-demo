import React, { useMemo, useState, useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';

const SearchContent = () => {
     const history = useHistory();
     const { ref, inView } = useInView();

     const [text, setText] = useState('')
     const [loading, setLoading] = useState(false)

     // const submit = (e) => {
     //      e.preventDefault()
     // }
     const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

     useEffect(() => {
          if (inView) {
               setLoading(true)
          } else {
               setLoading(false)
          }
     }, [inView])

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
                              data.map((item, index) => (
                                   <li onClick={() => history.push(`/user-info/${item}`)} ref={data.length - 1 === index ? ref : null} key={index}>
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
                         {loading && <div className="loading-wrapper">
                              <PulseLoader
                                   color={'#00afff'}
                                   size={8}
                                   margin={3}
                                   speedMultiplier={0.8}
                              />
                         </div>}

                    </ul>
               </div>
          </div>
     )
}

export default SearchContent
