import axios from 'axios'
const baseUrl = '/styles/'
const baseDevUrl = 'http://localhost:3001/styles'

const getDarkStyle = async () => {
  let request
  
  if (process.env.NODE_ENV === 'development') {
    request = await axios.get(baseDevUrl + '/dark.css')
  } else {
    request = await axios.get(baseUrl + 'dark.css')
  }

  return request.data
}

const getDefaultStyle = async () => {
  let request
  
  if (process.env.NODE_ENV === 'development') {
    request = await axios.get(baseDevUrl + '/default.css')
  } else {
    request = await axios.get(baseUrl + 'default.css')
  }

  return request.data
  }

export default {getDarkStyle, getDefaultStyle}