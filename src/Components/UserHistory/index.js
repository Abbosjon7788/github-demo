import React, { useState, useEffect } from 'react'

const UserHistory = () => {

     const [data, setData] = useState(null)

     useEffect(() => {
          const historyData = localStorage.getItem('users_name')
          const parsedData = JSON.parse(historyData)
          setData(parsedData?.users)
          console.log(JSON.parse(historyData))
     }, [])

     return (
          <div className="user-history">
               {
                    data && data.reverse().map((item, index) => (
                         <div key={index}>
                              <img src={item.image} alt="" />
                              <span>{item.name}</span>
                         </div>
                    ))
               }
          </div>
     )
}

export default UserHistory
