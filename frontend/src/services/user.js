import axios from 'axios'
const baseUrl = '/api/users'
const baseDevUrl = 'http://localhost:3001/api/users'

const singUp = async credentials => {
  if (process.env.NODE_ENV === 'development') {
    const response = await axios.post(baseDevUrl, credentials)
  return response.data
  } else {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  }
}

const delUser = async credentials => {
  if (process.env.NODE_ENV === 'development') {
    const response = await axios.delete(baseDevUrl, { data: credentials })
  return response.data
  } else {
    const response = await axios.delete(baseUrl, { data: credentials })
  return response.data
  }
}

const editUser = async credentials =>{
  
  if (process.env.NODE_ENV === 'development') {
    const response = await axios.put(baseDevUrl, credentials)
  return response.data
  } else {
    const response = await axios.put(baseUrl, credentials)
  return response.data
  }
  
}

export default { singUp, delUser, editUser }