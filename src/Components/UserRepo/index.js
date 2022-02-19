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
          const newName = name[0].toUpperCase() + name.substring(1)
          getUserRepos(newName, setLoading)
               .then(res => {
                    setData(res.data)
                    setLoading(false)
               })
     }, [name])

     useEffect(() => {
          if (inView) {
               if (!dataLoad && !isFinished) {
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
                                                       <span>23</span>
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
