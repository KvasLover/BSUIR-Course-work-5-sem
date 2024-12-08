import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Импортируем Link и useNavigate
import { Context } from ".."; // Импортируем контекст
import { ADMIN_ROUTE, BASKET_ROUTE, STATION_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "../utils/consts"; // Импортируем маршруты
import '../styles/NavBar.css';
import { observer } from "mobx-react-lite";
import { useLocation } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context); // Получаем данные пользователя из контекста
    const navigate = useNavigate(); // Получаем функцию навигации

    /*const handleLogout = () => {
        user.setIsAuth(false); // Устанавливаем аутентификацию в false
        user.setRole(''); // Сбрасываем роль
        navigate(LOGIN_ROUTE); // Перенаправляем на страницу логина
    };*/
    const location = useLocation();
    return (
        <nav>
            <ul>
                <li>
                    <Link to={MAIN_PAGE_ROUTE}>Главная</Link> {/* Ссылка на главную страницу */}
                </li>
            </ul>
            <ul>                
                {user.isAuth ? ( // Проверяем, авторизован ли пользователь
                    <>
                        {user.role === 1 ? ( // Проверяем роль пользователя
                            <>
                                <li>
                                    <Link to={STATION_ROUTE}>Расписание</Link> {/* Ссылка на расписание */}
                                </li>
                                <li>
                                    <Link to={BASKET_ROUTE}>Корзина</Link> {/* Ссылка на корзину */}
                                </li>
                                <li>
                                    <Link to={LOGIN_ROUTE}>Выйти из аккаунта</Link> {/* Выйти из аккаунта */}
                                </li>
                                <li>
                                    <Link to={PROFILE_PAGE_ROUTE}>Мой профиль</Link> {/* Выйти из аккаунта */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={STATION_ROUTE}>Расписание</Link> {/* Ссылка на расписание */}
                                </li>
                                <li>
                                    <Link to={ADMIN_ROUTE}>Админ панель</Link> {/* Ссылка на админскую панель */}
                                </li>
                                <li>
                                    <Link to={LOGIN_ROUTE}>Выйти из аккаунта</Link> {/* Выйти из аккаунта */}
                                </li>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={STATION_ROUTE}>Расписание</Link> {/* Ссылка на расписание */}
                        </li>
                        <li>
                            <Link to={LOGIN_ROUTE}>Войти</Link> {/* Ссылка на страницу входа */}
                        </li>
                        <li>
                            <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link> {/* Ссылка на страницу регистрации */}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
});

export default NavBar;