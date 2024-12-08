import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Импортируем useNavigate и Link

const FlightItem = ({ flight }) => {
    const navigate = useNavigate(); // Используем useNavigate для навигации

    const handleAddToCart = () => {
        // Создаем новый объект с необходимыми полями
        const flightData = {
            id: flight.id,
            name: flight.name,
            start_location: flight.start_location,
            finish_location: flight.finish_location,
            date: flight.date,
            // Добавьте другие необходимые поля
        };
        navigate('/flight', { state: { flight: flightData } });
    }
    
    return (
        <div className="flight-item">  
            <p>Пункт отправления: {flight.start_location}</p>
            <p>Пункт прибытия: {flight.finish_location}</p>          
            <p>Модель автобуса: {flight.BusAliasForGettingBusModelInFlight ? flight.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p> {/* Отображаем модель автобуса */}
            <Link to={`/bus/${flight.bus_id}`} style={{ marginLeft: '10px', color: '#007BFF', textDecoration: 'none' }}>
                Подробнее про автобус
            </Link>
            <Link to={`/route/${flight.route_id}`} style={{ marginLeft: '10px', color: '#007BFF', textDecoration: 'none' }}>
                Подробнее про маршрут
            </Link>
            <p>Время в пути: {flight.time_in_ride}</p>
            <p>Время отправления: {flight.start_time}</p>
            <p>Время прибытия: {flight.finish_time}</p>
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
