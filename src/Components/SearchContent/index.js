import React, { useMemo, useState, useEffect, useRef } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import { PulseLoader, ClipLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { searchUsers, getMoreFoundUsers, getOneUser } from '../../Redux/ApiCalls'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
               setData(null)
          }
     }, [text])

     useEffect(() => {
          const timeout = setTimeout(() => setQuery(text), 200)
          return () => clearTimeout(timeout)
     }, [text])

     useEffect(() => {
          let isMounted = true;
          if (query && query.length > 0) {
               searchUsers(text, setSearchLoad)
                    .then(res => {
                         if (isMounted) {
                              setData(res.data?.items)
                              setTotalCount(res.data?.total_count)
                              setSearchLoad(false)
                              // mapData(res?.data?.items)
                              console.log(res.data || {})
                              res.data?.items.length > 0 && myRef.current.scrollTo(0, 0)
                         }
                    })
          }
          return () => { isMounted = false }
     }, [query])

     useEffect(() => {
          if (inView) {
               if (!loading && data.length < totalCount) {
                    setLoading(true)
                    getMoreFoundUsers(query, pageNum, setLoading)
                         .then(res => {
                              const current = res.data?.items
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

     const handleChanges = (e) => {
          setText(e.target.value)
     }

     // const mapData = (url) => {
     //      const name = ''
     //      const followers = ''
     //      getOneUser(url, setSearchLoad)
     //           .then(res => {
     //                setSearchLoad(false)
     //                name = res.data.name
     //                followers = res.data.followers
     //                console.log(res.data.name)
     //           })

     //      return {
     //           name,
     //           followers
     //      }
     // }


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
                                             <li onClick={() => history.push(`/user-repo/${item.login}`)} ref={data.length - 1 === index ? ref : null} key={index}>
                                                  <div className="user-content">
                                                       <div className="user-img">
                                                            <LazyLoadImage src={item.avatar_url} effect={'blur'} w="100%" height="100%" />
                                                       </div>
                                                       <div className="right">
                                                            <div className="user-login">
                                                                 <label>Login:</label>
                                                                 <span>{item.login}</span>
                                                            </div>
                                                            <div className="user-name">
                                                                 <label>Name:</label>
                                                                 <span>Abbosjon Nosirov</span>
                                                            </div>
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
