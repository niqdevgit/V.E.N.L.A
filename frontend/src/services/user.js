import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const singUp = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const delUser = async credentials => {
  const response = await axios.delete(baseUrl, { data: credentials })
  return response.data
}

const editUser = async credentials =>{
  const response = await axios.put(baseUrl, credentials)
  return response.data
}

export default { singUp, delUser, editUser }