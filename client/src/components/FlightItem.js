import React from "react";
import { /*useNavigate, */Link } from "react-router-dom"; // Импортируем useNavigate и Link

const FlightItem = ({ flight }) => {
    //const navigate = useNavigate(); // Используем useNavigate для навигации

    const handleAddToCart = () => {
        console.log(`Рейс ${flight.id} добавлен в корзину`);
    };

    return (
        <div className="flight-item">
            <h4>Маршрут: {flight.route_id}</h4>
            <p>id автобуса: {flight.bus_id}</p>
            <Link to={`/bus/${flight.bus_id}`} style={{ marginLeft: '10px', color: '#007BFF', textDecoration: 'none' }}>
                Подробнее про автобус
            </Link>
            <p>Время в пути: {flight.time_in_ride}</p>
            <p>Начало: {flight.start_time}</p>
            <p>Конец: {flight.finish_time}</p>
            <p>Дата: {flight.date}</p>
            <p>Свободные места: {flight.free_seats}</p>
            <p>Цена: {flight.price}</p>

            <button onClick={handleAddToCart} style={{ marginTop: '10px' }}>
                Добавить в корзину
            </button>
        </div>
    );
}

export default FlightItem;
