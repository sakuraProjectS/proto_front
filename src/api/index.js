import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'https://54.168.35.214/v1'
    baseURL: 'http://localhost:3000/v1'
  })
}