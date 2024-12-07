import React, { useState } from 'react';
import '../styles/Auth.css'; // Импортируем стили
import { useLocation, Link } from "react-router-dom"; // Импортируем Link для навигации
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
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
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button> {/* Меняем текст кнопки */}
                
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
                </div>
            </form>
        </div>
    );
};

export default Auth;
