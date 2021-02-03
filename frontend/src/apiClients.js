import axios from 'axios';

export const dawaAPI = axios.create({
  baseURL: 'https://dawa.aws.dk',
  params: {
    hovedtype: 'Bebyggelse',
    undertype: 'by'
  }
});

export const weatherAPI = axios.create({
  baseURL: 'http://localhost:5000'
});
