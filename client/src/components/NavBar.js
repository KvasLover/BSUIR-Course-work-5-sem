import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Импортируем Link и useNavigate
import { Context } from ".."; // Импортируем контекст
import { ADMIN_ROUTE, BASKET_ROUTE, STATION_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "../utils/consts"; // Импортируем маршруты
import '../styles/NavBar.css';
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context); // Получаем данные пользователя из контекста
    const navigate = useNavigate(); // Получаем функцию навигации
    const location = useLocation()
    
    const handleBack = () => {
        if (location.pathname !== '/')
            navigate(-1);
    }
    
    return (
        <nav>
            <ul>
                <li>
                    <Link to={MAIN_PAGE_ROUTE}>Главная</Link> {/* Ссылка на главную страницу */}
                </li>
                <li>
                <button className="back-button" onClick={handleBack}>Назад</button>
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
    )
});

export default NavBar;