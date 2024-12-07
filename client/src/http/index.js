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
