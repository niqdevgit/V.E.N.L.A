import axios from 'axios'
const baseUrl = '/api/foods'
const baseDevUrl = 'http://localhost:3001/api/foods'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  if (process.env.NODE_ENV === 'development') {
    const request = axios.get(baseDevUrl)
    return request.data
  } else {
    const request = axios.get(baseUrl)
    return request.data
  }
}

const getUserFoods = () => {
  const config = {
    headers: { Authorization: token },
  }
  
  if (process.env.NODE_ENV === 'development') {
    return axios.get(baseDevUrl,config)
  } else {
    return axios.get(baseUrl,config)
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

export default { 
  getAll, create, setToken, getUserFoods
}