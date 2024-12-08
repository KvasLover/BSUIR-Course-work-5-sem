import React, { useState } from 'react';
import '../styles/MainPage.css'; // Импортируем стили

const MainPage = () => {
    const [tripType, setTripType] = useState('oneWay'); // Состояние для типа поездки

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
    };

    return (
        <div className="main-page">
            <header className="main-header">
                <img 
                    src="https://example.com/your-image.jpg" // Замените на URL вашего изображения
                    alt="Header"
                    className="header-image"
                />
            </header>

            <main>
                
                {/* Блок для поиска рейсов */}
                <div className="search-block">
                    <h2>Поиск рейсов на автобус</h2>
                    <form className="search-form">
                        <div className="form-group">
                            <label htmlFor="departure">Пункт отправления:</label>
                            <input type="text" id="departure" placeholder="Город отправления" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrival">Пункт прибытия:</label>
                            <input type="text" id="arrival" placeholder="Город прибытия" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Желаемая дата:</label>
                            <input type="date" id="date" required />
                        </div>
                        <div className="form-group trip-type">
                            <label>Тип поездки:</label>
                            <div className="toggle-switch">
                                <input 
                                    type="radio" 
                                    id="oneWay" 
                                    name="tripType" 
                                    value="oneWay" 
                                    checked={tripType === 'oneWay'} 
                                    onChange={handleTripTypeChange} 
                                />
                                <label htmlFor="oneWay">В одну сторону</label>

                                <input 
                                    type="radio" 
                                    id="roundTrip" 
                                    name="tripType" 
                                    value="roundTrip" 
                                    checked={tripType === 'roundTrip'} 
                                    onChange={handleTripTypeChange} 
                                />
                                <label htmlFor="roundTrip">Туда-обратно</label>
                            </div>
                        </div>
                        <button type="submit">Найти рейсы</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
