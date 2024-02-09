import axios from 'axios'
const baseUrl = '/api/login'
const baseDevUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
  let response

  if (process.env.NODE_ENV === 'development') {
    response = await axios.post(baseDevUrl, credentials)
  } else {
    response = await axios.post(baseUrl, credentials)
  }

  return response.data
}

export default { login }