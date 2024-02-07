import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/foods'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.data
}

const getUserFoods = () => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.get(baseUrl,config)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

export default { 
  getAll, create, update, setToken, getUserFoods
}