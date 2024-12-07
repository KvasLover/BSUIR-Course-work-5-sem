import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Для получения параметров из URL
import { fetchRoute } from '../http'; // Импортируйте функцию для получения автобуса

const RoutePage = () => {
    const { id } = useParams(); // Получаем ID автобуса из URL
    const [route, setRoute] = useState(null); // Состояние для хранения данных автобуса
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    useEffect(() => {
        const getRoute = async () => {
            try {
                const data = await fetchRoute(id); // Получаем данные о автобусе по ID
                setRoute(data); // Устанавливаем данные в состояние
            } catch (err) {
                setError(err.message); // Устанавливаем сообщение об ошибке
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        getRoute(); // Вызываем функцию получения данных о автобусе
    }, [id]); 

    if (loading) return <div>Загрузка...</div>; // Отображаем сообщение о загрузке
    if (error) return <div>Ошибка: {error}</div>; // Отображаем сообщение об ошибке

    return (
        <div>
            <h2>Информация о маршруте</h2>
            {route && (
                <>
                    <p>ID: {route.id}</p>
                    <p>Пункт отправления: {route.start_location}</p>
                    <p>Пункт прибытия: {route.finish_location}</p>
                    <p>Номер маршрута: {route.number}</p>
                </>
            )}
        </div>
    );
};

export default RoutePage;
