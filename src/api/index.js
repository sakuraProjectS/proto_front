import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://13.114.43.226/v1'
    // baseURL: 'http://localhost:3000/v1'
  })
}