import React, { useContext, useState } from 'react';
import { BasketContext } from '../components/BasketContext'; // Импортируйте ваш контекст корзины
import '../styles/Basket.css'; // Импортируем стили для корзины
import { Context } from '..'; // Импортируем контекст пользователя

const Basket = () => {
    const { basketItems, setBasketItems } = useContext(BasketContext); // Получаем элементы корзины и функцию для обновления
    const { user } = useContext(Context); // Получаем данные пользователя из контекста
    const [error, setError] = useState(''); // Сообщение об ошибке

    const extractBalance = (balanceString) => {
        const numericPart = balanceString.replace(/\D/g, ''); // Удаляем все нецифровые символы
        return parseInt(numericPart, 10); // Преобразуем в целое число
    };

    const handleCheckout = (item) => {
        const totalPrice = item.tripType === "roundTrip" ? item.price * 2 : item.price;
        const userBalance = extractBalance(user.user.balance); // Извлекаем числовую часть баланса

        if (userBalance < totalPrice) {
            setError('Недостаточно средств на балансе.');
            return;
        }

        // Списываем сумму с баланса
        const newBalance = userBalance - totalPrice;
        user.setUser({ ...user.user, balance: `${newBalance}byn` }); // Обновляем баланс с добавлением "byn"

        // Убираем рейс из корзины
        setBasketItems(prevItems => prevItems.filter(basketItem => basketItem.id !== item.id));

        alert('Успех! Рейс оформлен.');
    };

    return (
        <div className="container">
            <h1>Корзина, ваш баланс - {user.user.balance} ₽</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
            {basketItems.length > 0 ? (
                basketItems.map((item) => (
                    <div className="flight-item" key={item.id}>
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
                                <p><strong>Цена:</strong> {item.price} ₽ х 2 = {item.price * 2} ₽</p>
                            </>
                        ) : (
                            <p><strong>Цена:</strong> {item.price} ₽</p>
                        )}
                        <button onClick={() => handleCheckout(item)}>Оформить</button>
                    </div>
                ))
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
};

export default Basket;
