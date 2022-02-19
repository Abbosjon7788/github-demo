import axios from "axios";
import { checkNetworkErr } from '../../Components/Utils'
import { error } from '../../Components/MyAlerts'

const baseURL = 'https://api.github.com/'

export const searchUsers = async (query, setLoading) => {
     return await axios({
          baseURL,
          url: `/search/users?q=${query}`,
          method: 'GET',
     })
          .catch((err) => {
               setLoading(false)
               error(err.response?.data.message)
               checkNetworkErr(err)
          })
}