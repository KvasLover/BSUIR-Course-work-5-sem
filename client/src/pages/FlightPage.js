import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const FlightPage = () => {
    const location = useLocation();
    const { flight, tripType } = location.state || {}; // Получаем информацию о рейсе и типе поездки из состояния

    // Устанавливаем начальное значение для типа поездки
    //const [inputType, setInputType] = useState(tripType || ''); // Устанавливаем начальное значение

    if (!flight) {
        return <h2>Информация о рейсе недоступна.</h2>;
    }

    return (
        <div>
        {tripType ? ( // Проверяем роль пользователя
            <>
                
                <h1>
                    a
                </h1>
            </>
        ) : (
            <>
                
                <h1>
                    b
                </h1>
            </>
        )}        <div>
            <h1>Информация о рейсе</h1>
            <div className="flight-item">
            <p>Пункт отправления: {flight.start_location}</p>
            <p>Пункт прибытия: {flight.finish_location}</p>
            <p>Модель автобуса: {flight.BusAliasForGettingBusModelInFlight ? flight.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p>
            <p>Время в пути: {flight.time_in_ride}</p>
            <p>Время отправления: {flight.start_time}</p>
            <p>Время прибытия: {flight.finish_time}</p>
            <p>Дата: {flight.date}</p>
            <p>Свободные места: {flight.free_seats}</p>
            <p>Цена: {flight.price}</p>
            </div>

            
        </div></div>
    );
};

export default FlightPage;
