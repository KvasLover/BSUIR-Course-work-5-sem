import React, { useState, useContext } from 'react';
import '../styles/Auth.css'; // Импортируем стили
import { useLocation, Link } from "react-router-dom"; // Импортируем Link для навигации
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { Context } from ".."; // Импортируем контекст
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from '../http'

const Auth = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE; // Определяем, находимся ли мы на странице авторизации
    const [username, setUsername] = useState(''); // Логин
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Пароль
    
    const navigate = useNavigate(); // Получаем функцию навигации

    // Функция обработки отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*console.log('Username:', username); // Логируем логин
        console.log('Password:', password); // Логируем пароль*/
        try {
            if (isLogin) {
                // Логин
                const response = await loginUser(username, password);
                user.setIsAuth(true); // Устанавливаем аутентификацию в true
                console.log(response.user);
                navigate('/'); // Перенаправляем на главную страницу
            } else {
                // Регистрация
                const response = await registerUser(username, email, password);
                console.log(response);
                navigate('/login'); // Перенаправляем на страницу логина после успешной регистрации
            }
        } catch (error) {
            console.error(error.response.data.message); // Логируем ошибку
            alert(error.response.data.message); // Показываем сообщение об ошибке пользователю
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); // Переход на страницу логина
    };
    /*
    вместо кнопки submit
    {isLogin ? (
                    <>
                        <button onClick={() => user.setIsAuth(true)}>Войти</button> {}
                        </>
                    ) : (
                        <>
                            <button type="submit" onClick={handleLoginClick}>Зарегистрироваться</button> {}
                        </>
                    )}
    */
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
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
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
                
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                
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
