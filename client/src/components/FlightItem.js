import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const FlightItem = ({ flight, tripType }) => {
    const navigate = useNavigate(); // Получаем функцию навигации

    //const location = useLocation();
    //const { flight, tripType } = location.state || {}; // Получа
    if(!flight)
        console.log("хуй")
    console.log(tripType)
    
    const handleAddToCart = () => {
        // Создаем новый объект с необходимыми полями
        const flightData = {
            id: flight.id,
            name: flight.name,
            start_location: flight.start_location,
            finish_location: flight.finish_location,
            busModel: flight.BusAliasForGettingBusModelInFlight ? flight.BusAliasForGettingBusModelInFlight.model : 'Неизвестно',
            bus_id: flight.bus_id,
            route_id: flight.route_id,
            time_in_ride: flight.time_in_ride,
            start_time: flight.start_time,
            finish_time: flight.finish_time,
            date: flight.date,
            free_seats: flight.free_seats,
            price: flight.price
        };
        //console.log(tripType)
        // Переход на FlightPage с передачей параметров рейса и типа поездки
        //navigate('/flight', { state: { flight: flightData, tripType } });
        navigate('/flight', { state: { flight: flightData, tripType } });
    };

    return (
        <div className="flight-item">
            <p>Пункт отправления: {flight.start_location}</p>
            <p>Пункт прибытия: {flight.finish_location}</p>
            <p>Модель автобуса: {flight.BusAliasForGettingBusModelInFlight ? flight.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p>
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
            <button onClick={handleAddToCart}>Добавить в корзину</button>
            </div>
    );
};

export default FlightItem;
