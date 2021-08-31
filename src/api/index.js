import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'https://www.sakuraproto.com/v1'
    baseURL: 'http://localhost:3000/v1'
  })
}