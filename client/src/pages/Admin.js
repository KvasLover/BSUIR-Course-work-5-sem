import React, { useState } from 'react';
import '../styles/Admin.css'; // Импортируем стили для админ-панели
import { fetchFlights, fetchUsers } from '../http/index'; // Импортируем функции для работы с API


const Admin = () => {
    const [userId, setUserId] = useState('');
    const [flightId, setFlightId] = useState('');
    const [results, setResults] = useState([]); // Состояние для хранения результатов запросов
    const [isUserView, setIsUserView] = useState(true); // Состояние для переключения между пользователями и рейсами
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления открытием модального окна
    const [searchType, setSearchType] = useState(''); // Тип поиска (пользователь или рейс)
    
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleFlightIdChange = (e) => {
        setFlightId(e.target.value);
    };

    const handleFindUser = () => {
        console.log(`Ищем пользователя с ID: ${userId}`);
        setResults(`Найден пользователь с ID: ${userId}`); // Пример результата
    };
    const handleDeleteUser = () => {
        console.log(`Удаляем пользователя с ID: ${userId}`);
        setResults(`Пользователь с ID: ${userId} удален.`); // Пример результата
    };
    const handleUpdateUser = () => {
        console.log(`Изменяем пользователя с ID: ${userId}`);
        setResults(`Данные пользователя с ID: ${userId} изменены.`); // Пример результата
    };
    const handleCreateUser = () => {
        console.log('Создаем нового пользователя');
        setResults('Форма для создания нового пользователя'); // Пример результата
    };
    const handleFindFlight = () => {
        console.log(`Ищем рейс с ID: ${flightId}`);
        setResults(`Найден рейс с ID: ${flightId}`); // Пример результата
    };
    const handleDeleteFlight = () => {
        console.log(`Удаляем рейс с ID: ${flightId}`);
        setResults(`Рейс с ID: ${flightId} удален.`); // Пример результата
    };
    const handleUpdateFlight = () => {
        console.log(`Изменяем рейс с ID: ${flightId}`);
        setResults(`Данные рейса с ID: ${flightId} изменены.`); // Пример результата
    };
    const handleCreateFlight = () => {
        console.log('Создаем новый рейс');
        setResults('Форма для создания нового рейса'); // Пример результата
    };
    const handleViewAllUsers = async () => {
        try {
            const users = await fetchUsers(); // Получаем всех пользователей
            setIsUserView(true)
            setResults(users); // Сохраняем данные пользователей в состоянии
        } catch (error) {
            setResults(`Ошибка: ${error.message}`);
        }
    };

    const handleViewAllFlights = async () => {
        try {
            const flights = await fetchFlights(); // Получаем все рейсы
            setIsUserView(false)
            setResults(flights); // Сохраняем данные рейсов в состоянии
        } catch (error) {
            setResults(`Ошибка: ${error.message}`);
        }
    };

    return (
        <div className="admin-container">
            <h1>Админ панель</h1>
            <div className="admin-category">
                <h2>Работа с пользователями</h2>
                <input 
                    type="text" 
                    placeholder="Введите ID пользователя" 
                    value={userId} 
                    onChange={handleUserIdChange} 
                />
                <button onClick={handleFindUser}>Найти пользователя по ID</button>
                <button onClick={handleDeleteUser}>Удалить пользователя по ID</button>
                <button onClick={handleUpdateUser}>Изменить пользователя по ID</button>
                <button onClick={handleCreateUser}>Создать пользователя</button>
                <button onClick={handleViewAllUsers}>Просмотреть все записи</button>
                </div>
            <div className="admin-category">
                <h2>Работа с рейсами</h2>
                <input 
                    type="text" 
                    placeholder="Введите ID рейса" 
                    value={flightId} 
                    onChange={handleFlightIdChange} 
                />
                <button onClick={handleFindFlight}>Найти рейс по ID</button>
                <button onClick={handleDeleteFlight}>Удалить рейс по ID</button>
                <button onClick={handleUpdateFlight}>Изменить рейс по ID</button>
                <button onClick={handleCreateFlight}>Создать рейс</button>
                <button onClick={handleViewAllFlights}>Просмотреть все записи</button>
                </div>

{/* Заголовок для области результатов */}
<h3>Результаты:</h3>
{/* Область для вывода результатов запросов */}
<div className="results-container">
                {Array.isArray(results) ? (
                    results.map(item  => (
                        isUserView ? (
                            <div key={item.id} className="user-card">
                                <h4>ID: {item.id}</h4>
                                <p><strong>Имя:</strong> {item.username}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Роль:</strong> {item.role === 1 ? 'Клиент' : 'Администратор'}</p>
                                <p><strong>Баланс:</strong> {item.balance || 'Не указан'}</p>
                                <p><strong>Создан:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        ) : (
                            <div key={item.id} className="flight-card">
                                <h4>ID: {item.id}</h4>
                                <p><strong>Пункт отправления:</strong> {item.start_location}</p>
                                <p><strong>Пункт прибытия:</strong> {item.finish_location}</p>
                                <p><strong>Цена:</strong> {item.price} ₽</p>
                            </div>
                        )
                                            ))
                                        ) : (
                                            <pre>{results}</pre> // Отображаем текстовые результаты, если это не массив
                                        )}
            </div>
            </div>
    );
};

export default Admin;