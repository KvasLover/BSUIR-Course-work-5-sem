// BasketContext.js
import React, { createContext, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (flight) => {
        // Проверяем, есть ли уже этот рейс в корзине
        const exists = basketItems.find(item => item.id === flight.id);
        if (!exists) {
            setBasketItems([...basketItems, flight]); // Добавляем рейс в корзину
        }
    };

    return (
        <BasketContext.Provider value={{ basketItems, addToBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
