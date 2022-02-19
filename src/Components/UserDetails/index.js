import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneUser } from '../../Redux/ApiCalls'
import Loader from '../../Components/Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from 'moment'

const UserDetails = () => {
     const { user } = useParams()
     const [data, setData] = useState(null)
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          getOneUser(user, setLoading)
               .then(res => {
                    setLoading(false)
                    setData(res.data)
               })
     }, [user])

     return (
          <React.Fragment>
               {!loading && <>
                    {data ?
                         <div className="user-details page">
                              <div className="content">
                                   <div className="user-info">
                                        <div className="user-img">
                                             <LazyLoadImage src={data.avatar_url} width="100%" height="100%" effect={'blur'} />
                                        </div>
                                        <div className="left">
                                             <div className="box">
                                                  <span>Name:</span>
                                                  <span className="name">{data.name}</span>
                                             </div>
                                             <div className="box">
                                                  <span>Login:</span>
                                                  <span className="name">{data.login}</span>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="box">
                                        <span>Followers:</span>
                                        <span>{data.followers}</span>
                                   </div>
                                   <div className="box">
                                        <span>Following:</span>
                                        <span>{data.following}</span>
                                   </div>
                                   <div className="box">
                                        <span>Yaratilgan vaqt:</span>
                                        <span>{moment(data.created_at).format('DD.MM.YYYY')}</span>
                                   </div>
                              </div>
                         </div> :
                         <p className="not-found">Users details not found!</p>
                    }
               </>
               }
               <Loader loading={loading} />
          </React.Fragment>
     )
}

export default UserDetails
