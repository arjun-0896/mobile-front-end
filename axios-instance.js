import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://192.168.1.124:3001/api/v1/'
});

export default instance;