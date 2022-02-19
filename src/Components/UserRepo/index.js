import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserRepos } from '../../Redux/ApiCalls'

const UserRepo = () => {
     const { name } = useParams()
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const newName = name[0].toUpperCase() + name.substring(1)
          getUserRepos(newName, setLoading)
               .then(res => {
                    setLoading(false)
                    console.log(res.data)
               })
     }, [name])

     return (
          <div className="user-repo">
               user-info
          </div>
     )
}

export default UserRepo
