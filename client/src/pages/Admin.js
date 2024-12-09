import React, { useState, useEffect } from 'react';
import '../styles/Admin.css'; // Импортируем стили для админ-панели
import { fetchFlights, fetchUsers } from '../http/index'; // Импортируем функции для работы с API
import ModalForIdSearch from '../components/ModalForIdSearch'; // Импортируем модальное окно

const Admin = () => {
    const [userId, setUserId] = useState('');
    const [flightId, setFlightId] = useState('');
    const [results, setResults] = useState([]); // Состояние для хранения результатов запросов
    const [isUserView, setIsUserView] = useState(true); // Состояние для переключения между пользователями и рейсами
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления открытием модального окна
    const [searchType, setSearchType] = useState(''); // Тип поиска (пользователь или рейс)

    const handleOpenModal = (type) => {
        setSearchType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUserId('');
        setFlightId('');
        setResults([]);
    };

    const handleFindById = async (id) => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            setResults(`Ошибка: введённый ID должен быть числом.`);
            handleCloseModal(); // Закрываем модальное окно после вывода ошибки
            return;
        }

        try {
            console.log(`Ищем ${searchType} с ID: ${parsedId}`); // Логируем ID и тип поиска
            if (searchType === 'user') {
                const users = await fetchUsers(); // Получаем всех пользователей
                console.log('Полученные пользователи:', users); // Логируем полученных пользователей

                const foundUser = users.find(u => u.id === parsedId);
                console.log('Найденный пользователь:', foundUser); // Логируем найденного пользователя

                if (foundUser) {
                    setResults([foundUser]); // Отображаем найденного пользователя
                } else {
                    setResults(`Пользователь с ID ${parsedId} не найден.`);
                    console.log(`Пользователь с ID ${parsedId} не найден.`); // Логируем сообщение о ненахождении
                }
            } else if (searchType === 'flight') {
                const flights = await fetchFlights(); // Получаем все рейсы
                console.log('Полученные рейсы:', flights); // Логируем полученные рейсы

                const foundFlight = flights.find(f => f.id === parsedId);
                console.log('Найденный рейс:', foundFlight); // Логируем найденный рейс

                if (foundFlight) {
                    setResults([foundFlight]); // Отображаем найденный рейс
                } else {
                    setResults(`Рейс с ID ${parsedId} не найден.`);
                    console.log(`Рейс с ID ${parsedId} не найден.`); // Логируем сообщение о ненахождении
                }
            }
        } catch (error) {
            setResults(`Ошибка: ${error.message}`);
        } finally {
            handleCloseModal(); // Закрываем модальное окно после поиска
        }
    };

    // Используем useEffect для логирования результатов при их изменении
    useEffect(() => {
        console.log('Результаты поиска:', results);
    }, [results]);

    return (
        <div className="admin-container">
            <h1>Админ панель</h1>
            <div className="admin-category">
                <h2>Работа с пользователями</h2>
                <button onClick={() => handleOpenModal('user')}>Найти пользователя по ID</button>
                <button>Просмотреть все записи</button>
            </div>
            <div className="admin-category">
                <h2>Работа с рейсами</h2>
                <button onClick={() => handleOpenModal('flight')}>Найти рейс по ID</button>
                <button>Просмотреть все записи</button>
            </div>

            {/* Заголовок для области результатов */}
            <h3>Результаты:</h3>

            {/* Отображение карточек пользователей или рейсов */}
            <div className="results-container">
                {Array.isArray(results) && results.length > 0 ? (
                    results.map(item => (
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
                    <pre>{results}</pre> // Отображаем текстовые результаты, если это не массив и не пусто
                )}
            </div>

            {/* Модальное окно */}
            <ModalForIdSearch 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSubmit={handleFindById} 
                title={`Введите ID ${searchType === 'user' ? 'пользователя' : 'рейса'}`} 
            />
        </div>
    );
};

export default Admin;
