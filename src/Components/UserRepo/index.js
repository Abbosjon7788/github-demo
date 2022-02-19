import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserRepos, getMoreRepos } from '../../Redux/ApiCalls'
import moment from 'moment'
import Loader from '../Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PulseLoader } from 'react-spinners'
import { useInView } from 'react-intersection-observer';

const UserRepo = () => {
     const { name } = useParams()
     const { ref, inView } = useInView();

     const [loading, setLoading] = useState(true)
     const [dataLoad, setDataLoad] = useState(false)
     const [isFinished, setIsFinished] = useState(false)
     const [pageNum, setPageNum] = useState(2)
     const [data, setData] = useState(null)

     useEffect(() => {
          let isMounted = true;
          const newName = name[0].toUpperCase() + name.substring(1)
          getUserRepos(newName, setLoading)
               .then(res => {
                    if (isMounted) {
                         setData(res.data)
                         setLoading(false)
                    }
               })

          return () => { isMounted = false }

     }, [name])

     useEffect(() => {
          if (data && data.length > 0) {
               let users_name = localStorage.getItem('users_name')
               if (users_name === null) {
                    localStorage.setItem('users_name', JSON.stringify({ users: [{ name: name, image: data[0].owner.avatar_url }] }))
               } else {
                    let obj = JSON.parse(users_name)
                    localStorage.removeItem('users_name')
                    let newObj = obj.users.filter(item => item.name === name)
                    if (newObj.length === 0) {
                         let arr = obj.users
                         arr.push({ name: name, image: data[0].owner.avatar_url })
                         localStorage.setItem('users_name', JSON.stringify({ users: arr }))
                    } else {
                         localStorage.setItem('users_name', JSON.stringify(obj))
                    }
               }
          }
     }, [data])

     useEffect(() => {
          if (inView) {
               if (!dataLoad && !isFinished && data.length >= 30) {
                    setDataLoad(true)
                    getMoreRepos(name, pageNum, setDataLoad)
                         .then(res => {
                              setDataLoad(false)
                              setPageNum(p => p + 1)
                              const current = res.data
                              if (current && current.length > 0) {
                                   setData([...data, ...current])
                              }
                              if (res.data.length >= 30) {
                                   setIsFinished(false)
                              } else {
                                   setIsFinished(true)
                              }
                         })
               }
          }
     }, [inView])

     return (
          <React.Fragment>
               {!loading && <>
                    {
                         data.length > 0 ? <div className="user-repo page">
                              <div className="main">
                                   {
                                        data.map((item, index) => (
                                             <div className="item" ref={data.length - 1 === index ? ref : null} key={item.id}>
                                                  <div className="user-content">
                                                       <div className="user-img">
                                                            {item.owner.avatar_url ?
                                                                 <LazyLoadImage src={item.owner?.avatar_url} width={'100%'} height={'100%'} effect={'blur'} /> :
                                                                 <img src="/assets/images/avatar.svg" alt="" />
                                                            }
                                                       </div>
                                                       <div className="right">
                                                            <div className="box">
                                                                 <span>Login: </span>
                                                                 <span className="name">{item.owner?.login}</span>
                                                            </div>
                                                            <div className="box">
                                                                 <span>Repo-name: </span>
                                                                 <span className="name">{item.name}</span>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  {item.description && <div className="box">
                                                       <span>Description:</span>
                                                       <span>{item.description}</span>
                                                  </div>}
                                                  <div className="box">
                                                       <span>Stars:</span>
                                                       <span>{item.stargazers_count}</span>
                                                  </div>
                                                  <div className="box">
                                                       <span>Created at:</span>
                                                       <span>{moment(item.created_at).format('DD.MM.YYYY')}</span>
                                                  </div>
                                             </div>
                                        ))
                                   }
                                   {
                                        dataLoad && <div className="loading-wrapper">
                                             <PulseLoader
                                                  color={'#0086ff'}
                                                  size={12}
                                                  margin={3}
                                                  speedMultiplier={0.8}
                                             />
                                        </div>
                                   }
                              </div>
                         </div> :
                              <p className="not-found">Repository not found!</p>
                    }
               </>
               }
               <Loader loading={loading} />
          </React.Fragment>
     )
}

export default UserRepo
