import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserRepos } from '../../Redux/ApiCalls'
import moment from 'moment'
import Loader from '../Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const UserRepo = () => {
     const { name } = useParams()
     const [loading, setLoading] = useState(true)
     const [data, setData] = useState(null)

     useEffect(() => {
          const newName = name[0].toUpperCase() + name.substring(1)
          getUserRepos(newName, setLoading)
               .then(res => {
                    setData(res.data)
                    setLoading(false)
                    console.log(res.data)
               })
     }, [name])

     return (
          <React.Fragment>
               {!loading && <>
                    {
                         data.length > 0 ? <div className="user-repo page">
                              <div className="main">
                                   {
                                        data.map(item => (
                                             <div className="item" key={item.id}>
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
