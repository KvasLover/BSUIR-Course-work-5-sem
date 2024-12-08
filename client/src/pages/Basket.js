import React, { useContext } from 'react';
import { BasketContext } from '../components/BasketContext'

const Basket = () => {
    const { basketItems } = useContext(BasketContext); // Получаем элементы корзины

    return (
        <div>
            <h1>Корзина</h1>
            {basketItems.length > 0 ? (
                basketItems.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <div>
                <p>Пункт отправления: {item.start_location}</p>
                <p>Пункт прибытия: {item.finish_location}</p>
                <p>Модель автобуса: {item.BusAliasForGettingBusModelInFlight ? item.BusAliasForGettingBusModelInFlight.model : 'Неизвестно'}</p>
                <p>Время в пути: {item.time_in_ride}</p>
                <p>Время отправления: {item.start_time}</p>
                <p>Время прибытия: {item.finish_time}</p>
                <p>Дата: {item.date}</p>
                <p>Свободные места: {item.free_seats}</p>
                <p>Цена: {item.price}</p>
            </div>
                    </div>
                ))
            ) : (
                <p>Корзина пуста.</p>
            )}
        </div>
    );
};

export default Basket;
