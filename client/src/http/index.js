import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

/*const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})*/

export const fetchUsers = async () => {
    const response = await $host.get('/api/user'); // Укажите правильный путь к вашему API для получения всех пользователей
    return response.data; // Возвращаем данные
};

export const fetchFlights = async () => {
    const response = await $host.get('http://localhost:5000/api/flight'); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

// Функция для получения информации об автобусе по ID
export const fetchBus = async (id) => {
    const response = await $host.get(`http://localhost:5000/api/bus/${id}`); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

export const fetchBuseModelFromFlight = async (bus_id) => {
    const response = await $host.get(`/api/flights/model?bus_id=${bus_id}`); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

export const fetchRoute = async (id) => {
    const response = await $host.get(`http://localhost:5000/api/route/${id}`); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

// role = 1 - client, 2 - admin
export const registerUser = async (username, email, password, role) => {
    const response = await $host.post('/api/user/registration', {
        username,
        email,
        password,
        role
    });
    return response.data; // Возвращаем данные о пользователе
};

// Функция для авторизации пользователя
export const loginUser = async (username, password) => {
    const response = await $host.post('/api/user/login', {
        username,
        password 
    });
    return response.data; // Возвращаем данные о пользователе
};

export const uploadImage = async (formData) => {
    const response = await axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data; // Предполагается, что сервер возвращает объект с полем img
};