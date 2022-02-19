import React, { useMemo, useState, useEffect, useRef } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import { PulseLoader, ClipLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { searchUsers, getMoreFoundUsers, getOneUser } from '../../Redux/ApiCalls'

const SearchContent = () => {
     const history = useHistory();
     const { ref, inView } = useInView();
     const myRef = useRef()

     const [text, setText] = useState('')
     const [query, setQuery] = useState('')
     const [loading, setLoading] = useState(false)
     const [searchLoad, setSearchLoad] = useState(false)
     const [pageNum, setPageNum] = useState(2)
     const [data, setData] = useState(null)
     const [totalCount, setTotalCount] = useState(null)

     useMemo(() => {
          if (text && text.length > 0) {
               setSearchLoad(true)
          } else {
               setSearchLoad(false)
          }
     }, [text])

     useEffect(() => {
          const timeout = setTimeout(() => setQuery(text), 500)
          return () => clearTimeout(timeout)
     }, [text])

     useEffect(() => {
          let isMounted = true;
          if (query && query.length > 0) {
               searchUsers(text, setSearchLoad)
                    .then(res => {
                         if (isMounted) {
                              setData(res?.data?.items)
                              setTotalCount(res.data?.total_count)
                              setSearchLoad(false)
                              // mapData(res?.data?.items)
                              console.log(res?.data)
                              res.data?.items.length > 0 && myRef.current.scrollTo(0, 0)
                         }
                    })
          }
          return () => { isMounted = false }
     }, [query])

     useEffect(() => {
          if (inView) {
               console.log(data.length)
               console.log(totalCount)
               if (!loading && data.length < totalCount) {
                    setLoading(true)
                    getMoreFoundUsers(query, pageNum, setLoading)
                         .then(res => {
                              const current = res?.data?.items
                              setLoading(false)
                              setPageNum(p => p + 1)
                              if (current && current.length > 0) {
                                   setData([...data, ...current])
                              }
                         })
               }

          } else {
               setLoading(false)
          }
     }, [inView])

     // useEffect(() => {
     //      if (data && data.length > 0) {
     //           mapData(data)
     //      }
     // }, [data])

     const handleChanges = (e) => {
          setText(e.target.value)
     }

     const mapData = (data) => {
          data.map(item => {
               getOneUser(item.url, setSearchLoad)
                    .then(res => {
                         setSearchLoad(false)
                         console.log(res.data)
                    })
               console.log(item.url)
          })
     }


     return (
          <div className="search-content">
               <div className={`${text && 'active'} search-btn`}>
                    <input type="text" onChange={handleChanges} placeholder="Search user..." />
                    <div className="icon-wrapper">
                         {
                              !searchLoad ?
                                   <IoSearchOutline className="search-icon" /> :
                                   <ClipLoader size={20} color={'#0086ff'} />
                         }
                    </div>
               </div>
               {data && <>
                    {
                         data.length > 0 ? <div className="found-users-wrapper">
                              <ul ref={myRef} className="found-users">
                                   {
                                        data.map((item, index) => (
                                             <li onClick={() => history.push(`/user-info/${item.id}`)} ref={data.length - 1 === index ? ref : null} key={index}>
                                                  <div>
                                                       <div className="user-login">
                                                            <label>Login:</label>
                                                            <span>{item.login}</span>
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
                                             color={'#0086ff'}
                                             size={8}
                                             margin={3}
                                             speedMultiplier={0.8}
                                        />
                                   </div>}

                              </ul>
                         </div> :
                              <p className="not-found">User not found!</p>
                    }
               </>
               }
          </div>
     )
}

export default SearchContent
