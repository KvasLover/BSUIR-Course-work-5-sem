import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FlightPage.css'; // Импортируем стили

const FlightPage = () => {
    const location = useLocation();
    const { flight, tripType } = location.state || {}; // Получаем информацию о рейсе и типе поездки из состояния
    const [tripTypePanel, setTripType] = useState(''); // Тип поездки
    const [error, setError] = useState(''); // Сообщение об ошибке
    const navigate = useNavigate(); // Получаем функцию навигации

    if (!flight) {
        return <h2>Информация о рейсе недоступна.</h2>;
    }

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
        setError(''); // Сбрасываем ошибку при выборе типа поездки
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Проверяем, выбран ли тип поездки
        if (!tripTypePanel) {
            setError('Пожалуйста, выберите тип поездки.'); // Устанавливаем сообщение об ошибке
            return; // Прерываем выполнение функции
        }
console.log("aaaaaaaa")
        // Перенаправляем на страницу расписания с параметрами запроса только если они заданы
        navigate(`/`);
    };

    const handleSubmit2 = (e) => {
        
console.log("bbbbbbbbb")
        // Перенаправляем на страницу расписания с параметрами запроса только если они заданы
        navigate(`/`);
    };

    return (
        <div className="container">
            <div className="flight-item">            
                <h1>Информация о рейсе</h1>
                <div>
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
            
            {tripType ? (
                <>              
                    {tripType === "oneWay" ? (
                        <>                
                            <h2>В одну сторону</h2>
                        </>
                    ) : (
                        <> 
                            <h2>Туда-обратно</h2>
                        </>
                    )}
                    <button onClick={handleSubmit2}>Добавить в корзину</button>
                </>
            ) : (
                <>            
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="form-group trip-type">
                            <h3>Тип поездки:</h3>
                            <div className="toggle-switch">
                                <input 
                                    type="radio" 
                                    id="oneWay" 
                                    name="tripTypePanel" 
                                    value="oneWay" 
                                    onChange={handleTripTypeChange} 
                                />
                            <label htmlFor="oneWay">В одну сторону</label>
                                <input 
                                    type="radio" 
                                    id="roundTrip" 
                                    name="tripTypePanel" 
                                    value="roundTrip" 
                                    onChange={handleTripTypeChange} 
                                />
                                <label htmlFor="roundTrip">Туда-обратно</label>
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
                        <button type="submit">Добавить в корзину</button>
                    </form>
                </>
            )}                   
            </div>
        </div>
    );
};

export default FlightPage;
