import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FlightPage.css'; // Импортируем стили
import { Context } from "..";
import { LOGIN_ROUTE } from '../utils/consts';
import { BasketContext } from '../components/BasketContext';

const FlightPage = () => {
    const location = useLocation();
    const { flight, tripType } = location.state || {}; // Получаем информацию о рейсе из состояния
    const [tripTypePanel, setTripTypePanel] = useState(''); // Тип поездки
    const [error, setError] = useState(''); // Сообщение об ошибке
    const navigate = useNavigate(); // Получаем функцию навигации
    const { user } = useContext(Context);
    const { addToBasket } = useContext(BasketContext);

    if (!flight) {
        return <h2>Информация о рейсе недоступна.</h2>;
    }

    const handleTripTypeChange = (e) => {
        setTripTypePanel(e.target.value); // Обновляем tripTypePanel
        setError(''); // Сбрасываем ошибку при выборе типа поездки
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE);
            return;
        }
        // Проверяем, выбран ли тип поездки
        if (!tripTypePanel) {
            setError('Пожалуйста, выберите тип поездки.'); // Устанавливаем сообщение об ошибке
            return; // Прерываем выполнение функции
        }
        //addToBasket(flight);
        addToBasket({ ...flight, tripType: tripTypePanel })
        alert('Рейс добавлен в корзину!');
    };

    const handleSubmit2 = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE);
            return;
        }
        // Проверяем, выбран ли тип поездки
        
        //addToBasket(flight);
        addToBasket({ ...flight, tripType })
        alert('Рейс добавлен в корзину!');
    };

    return (
        <div className="container">
            <div className="flight-item">            
                <h1>Информация о рейсе</h1>
                <p><strong>Пункт отправления:</strong> {flight.start_location}</p>
                <p><strong>Пункт прибытия:</strong> {flight.finish_location}</p>
                <p><strong>Модель автобуса:</strong> {flight.BusAliasForGettingBusModelInFlight ? flight.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p>
                <p><strong>Время в пути:</strong> {flight.time_in_ride}</p>
                <p><strong>Время отправления:</strong> {flight.start_time}</p>
                <p><strong>Время прибытия:</strong> {flight.finish_time}</p>
                <p><strong>Дата:</strong> {flight.date}</p>
                <p><strong>Свободные места:</strong> {flight.free_seats}</p>
                <p><strong>Цена:</strong> {flight.price}</p>

                {!tripType ? (
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
                ) : (
                    <>
                        <h2>{tripType === "oneWay" ? "В одну сторону" : "Туда-обратно"}</h2>
                        <button onClick={handleSubmit2}>Добавить в корзину</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FlightPage;
