import React, { useState, useContext } from 'react';
import '../styles/Auth.css'; // Импортируем стили
import { useLocation, Link } from "react-router-dom"; // Импортируем Link для навигации
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { Context } from ".."; // Импортируем контекст
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE; // Определяем, находимся ли мы на странице авторизации
    const [username, setUsername] = useState(''); // Логин
    const [password, setPassword] = useState(''); // Пароль

    // Функция обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username); // Логируем логин
        console.log('Password:', password); // Логируем пароль
    };

    const navigate = useNavigate(); // Получаем функцию навигации

    const handleLoginClick = () => {
        navigate('/login'); // Переход на страницу логина
    };
    
    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Логин:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isLogin ? (
                    <>
                        <button onClick={() => user.setIsAuth(true)}>Войти</button> {/* Меняем текст кнопки */}
                    </>
                ) : (
                    <>
                        <button type="submit" onClick={handleLoginClick}>Зарегистрироваться</button> {/* Меняем текст кнопки */}
                    </>
                )}
                
                
                <div className="footer">
                    {isLogin ? (
                        <>
                            <h3>Нет аккаунта?</h3>
                            <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link> {/* Ссылка на регистрацию */}
                        </>
                    ) : (
                        <>
                            <h3>Есть аккаунт?</h3>
                            <Link to={LOGIN_ROUTE}>Войди!</Link> {/* Ссылка на авторизацию */}
                        </>
                    )}
                    <h1>Статус аутентификации: {user.isAuth ? 'Авторизован' : 'Не авторизован'}</h1>
                </div>
            </form>
        </div>
    );
};

export default Auth;
