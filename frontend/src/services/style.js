import axios from 'axios'
const baseUrl = 'http://localhost:3001/styles/'


const getDarkStyle = async () => {
  const request = await axios.get(baseUrl + 'dark.css')
  
  return request.data
}

const getDefaultStyle = async () => {
    const request = await axios.get(baseUrl + 'default.css')
    return request.data
  }

export default {getDarkStyle, getDefaultStyle}