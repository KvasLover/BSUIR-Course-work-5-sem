import React, { useContext } from 'react';
import { BasketContext } from '../components/BasketContext'; // Импортируйте ваш контекст корзины
import '../styles/Basket.css'; // Импортируем стили для корзины

const Basket = () => {
    const { basketItems } = useContext(BasketContext); // Получаем элементы корзины

    return (
        <div className="container">
            <h1>Корзина</h1>
            {basketItems.length > 0 ? (
                basketItems.map((item) => (
                    <div className="flight-item" key={item.id}>
                        <h2>{item.name}</h2> {/* Заголовок для рейса */}
                        <p><strong>Пункт отправления:</strong> {item.start_location}</p>
                        <p><strong>Пункт прибытия:</strong> {item.finish_location}</p>
                        <p><strong>Модель автобуса:</strong> {item.BusAliasForGettingBusModelInFlight ? item.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p>
                        <p><strong>Время в пути:</strong> {item.time_in_ride}</p>
                        <p><strong>Время отправления:</strong> {item.start_time}</p>
                        <p><strong>Время прибытия:</strong> {item.finish_time}</p>
                        <p><strong>Дата:</strong> {item.date}</p>
                        <p><strong>Свободные места:</strong> {item.free_seats}</p>
                        {item.tripType === "roundTrip" ? (
                            <>
                                <p><strong>Ценааа:</strong> {item.price} х 2 = {item.price * 2} ₽</p>
                            </>
                        ) : (
                            <p><strong>Цена:</strong> {item.price} ₽</p>
                        )}
                    </div>
                ))
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
};

export default Basket;
