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
               error(err?.message)
               setLoading(false)
               checkNetworkErr(err)
          })
}

export const getMoreFoundUsers = async (query, page, setLoading) => {
     return await axios({
          baseURL,
          url: `/search/users?q=${query}&page=${page}`,
          method: 'GET',
     })
          .catch((err) => {
               error(err?.message)
               setLoading(false)
               checkNetworkErr(err)
          })
}

export const getOneUser = async (url, setLoading) => {
     return await axios({
          url,
          method: 'GET'
     })
          .catch((err) => {
               error(err?.message)
               setLoading(false)
               checkNetworkErr(err)
          })
}

export const getUserRepos = async (user, setLoading) => {
     return await axios({
          baseURL,
          url: `/users/${user}/repos`,
          method: 'GET',
     })
          .catch((err) => {
               error(err?.message)
               setLoading(false)
               checkNetworkErr(err)
          })
}

export const getMoreRepos = async (user, page, setLoading) => {
     return await axios({
          baseURL,
          url: `/users/${user}/repos?page=${page}`,
          method: 'GET',
     })
          .catch((err) => {
               error(err?.message)
               setLoading(false)
               checkNetworkErr(err)
          })
}