import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://conquest.weekendads.ru/',
});

export default instance;
