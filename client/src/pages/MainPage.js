import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css'; // Импортируем стили

const MainPage = () => {
    const [departure, setDeparture] = useState(''); // Пункт отправления
    const [arrival, setArrival] = useState(''); // Пункт прибытия
    const [date, setDate] = useState(''); // Желаемая дата
    const [tripType, setTripType] = useState(''); // Тип поездки
    const [error, setError] = useState(''); // Сообщение об ошибке
    const navigate = useNavigate(); // Получаем функцию навигации

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
        setError(''); // Сбрасываем ошибку при выборе типа поездки
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Проверяем, выбран ли тип поездки
        if (!tripType) {
            setError('Пожалуйста, выберите тип поездки.'); // Устанавливаем сообщение об ошибке
            return; // Прерываем выполнение функции
        }

        const startLocation = departure.trim(); // Убираем пробелы в начале и конце
        const finishLocation = arrival.trim();

        // Перенаправляем на страницу расписания с параметрами запроса только если они заданы
        navigate(`/station?start=${encodeURIComponent(startLocation)}&finish=${encodeURIComponent(finishLocation)}&date=${encodeURIComponent(date)}&type=${encodeURIComponent(tripType)}`);
    };
/*
<header className="main-header">
                <img 
                    src="https://example.com/your-image.jpg" // Замените на URL вашего изображения
                    alt="Header"
                    className="header-image"
                />
            </header>
*/

    return (
        <div className="main-page">           
            <main>
                <h1>Главная</h1>
                
                {/* Блок для поиска рейсов */}
                <div className="search-block">
                    <h2>Поиск рейсов на автобус</h2>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="departure">Пункт отправления:</label>
                            <input 
                                type="text" 
                                id="departure" 
                                placeholder="Город отправления" 
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrival">Пункт прибытия:</label>
                            <input 
                                type="text" 
                                id="arrival" 
                                placeholder="Город прибытия" 
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Желаемая дата:</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </div>
                        <div className="form-group trip-type">
                            <label>Тип поездки:</label>
                            <div className="toggle-switch">
                                <input 
                                    type="radio" 
                                    id="oneWay" 
                                    name="tripType" 
                                    value="oneWay" 
                                    onChange={handleTripTypeChange} 
                                />
                                <label htmlFor="oneWay">В одну сторону</label>

                                <input 
                                    type="radio" 
                                    id="roundTrip" 
                                    name="tripType" 
                                    value="roundTrip" 
                                    onChange={handleTripTypeChange} 
                                />
                                <label htmlFor="roundTrip">Туда-обратно</label>
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
                        <button type="submit">Найти рейсы</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
