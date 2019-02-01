import axios from 'axios'
import config from '../config'

const $axios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : config.baseURL,
  timeout: 3000,
  // headers: { common:{
  //   'Authorization': `Token ${window.localStorage.getItem('token_id')}`}
  // }
})


export default $axios