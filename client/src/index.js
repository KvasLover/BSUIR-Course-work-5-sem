import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot из react-dom/client
import App from './App';
import { createContext } from 'react';
import UserStore from './store/UserStore';
//import TicketStore from './store/TicketStore';
import FlightStore from './store/FlightStore';
import BusStore from './store/BusStore';
import { BasketProvider } from './components/BasketContext';

export const Context = createContext(null);

//console.log(process.env.REACT_APP_API_URL)

// Создаем корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root')); // Используем createRoot

// Рендерим приложение
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        flight: new FlightStore(),
        bus: new BusStore()
    }}>
        <BasketProvider>
            <App />
        </BasketProvider>        
    </Context.Provider>
);
