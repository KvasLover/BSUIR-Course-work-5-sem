import React from 'react';
import { useLocation } from 'react-router-dom';

const FlightPage = () => {
    const location = useLocation();
    const { flight } = location.state || {}; // Получаем информацию о рейсе из состояния

    if (!flight) {
        return <h2>Информация о рейсе недоступна.</h2>;
    }

    return (
        <div>
            <h1>Информация о рейсе</h1>
            <p><strong>Рейс:</strong> {flight.id}</p>
            <p><strong>Откуда:</strong> {flight.start_location}</p>
            <p><strong>Куда:</strong> {flight.finish_location}</p>
            <p><strong>Дата:</strong> {flight.date}</p>
            {/* Вы можете добавить другие поля, такие как цена, направление и т.д. */}
        </div>
    );
};

export default FlightPage;
