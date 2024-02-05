import axios from 'axios'
//const baseUrl = '/api/login'
const baseUrl = 'http://localhost:3001/api/users'

const singUp = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const delUser = async credentials => {
  const response = await axios.delete(baseUrl, credentials)
  return response.data
}

export default { singUp, delUser }