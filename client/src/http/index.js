import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const fetchFlights = async () => {
    const response = await $host.get('http://localhost:5000/api/flight'); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

// Функция для получения информации об автобусе по ID
export const fetchBus = async (id) => {
    const response = await $host.get(`http://localhost:5000/api/bus/${id}`); // Укажите правильный путь к вашему API
    return response.data; // Возвращаем данные
};

// Функция для регистрации пользователя
export const registerUser = async (username, email, password) => {
    const response = await $host.post('/api/user/registration', {
        username,
        email,
        password
        //role: 2 // Можно задать роль по умолчанию или передавать как параметр
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