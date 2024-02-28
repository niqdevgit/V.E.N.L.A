import axios from 'axios'
const baseUrl = '/api/foods'
const baseDevUrl = 'http://localhost:3001/api/foods'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  if (process.env.NODE_ENV === 'development') {
    const request = await axios.get(baseDevUrl)
    return request.data
  } else {
    const request = await axios.get(baseUrl)
    return request.data
  }
}

const getUserFoods = async () => {
  const loggedUserJSON = window.localStorage.getItem('loggedappUser')
  const user = JSON.parse(loggedUserJSON)
  const token = `Bearer ${user.token}`
  const config = {
    headers: { Authorization: token },
  }
  
  if (process.env.NODE_ENV === 'development') {
    const request = await axios.get(baseDevUrl,config)
    return request.data
  } else {
    const reguest = await axios.get(baseUrl,config)
    return reguest.data
  }
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  if (process.env.NODE_ENV === 'development') {
    const request = axios.post(baseDevUrl, newObject, config)
  return request.data
  } else {
    const request = axios.post(baseUrl, newObject, config)
  return request.data
  }
}

const remove = id => {
  const config = {
    headers: { Authorization: token },
    data:  id
  }

  if (process.env.NODE_ENV === 'development') {
    const request = axios.delete(baseDevUrl, config)
  return request.data
  } else {
    const request = axios.delete(baseUrl, config)
  return request.data
  }
}

export default { 
  getAll, create, setToken, remove, getUserFoods
}