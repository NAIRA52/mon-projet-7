import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');