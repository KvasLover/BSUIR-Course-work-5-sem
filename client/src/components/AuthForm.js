import React, { useState } from 'react';
import axios from 'axios';
import CurrentUser from '../store/currentUser'; // Импортируем CurrentUser

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 2 // Установим роль по умолчанию для регистрации
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/user/login' : 'http://localhost:5000/api/user/registration';
        
        try {
            const response = await axios.post(url, formData);
            console.log(response.data); // Обработка ответа от сервера
            alert(response.data.message); // Покажем сообщение от сервера
            if (isLogin) {
                // Сохраните информацию о пользователе в CurrentUser
                CurrentUser.setUser(response.data.user);
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert(error.response?.data?.message || 'Произошла ошибка'); // Покажем ошибку
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {!isLogin && (
                    <input
                        type="number"
                        name="role"
                        placeholder="Роль (по умолчанию 2)"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                )}
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
        </div>
    );
};

export default AuthForm;
