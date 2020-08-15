import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

const key = process.env.REACT_APP_API_KEY;

export {
    clienteAxios,
    key
};