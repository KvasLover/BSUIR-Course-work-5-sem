import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import { Context } from ".."; // Импортируем контекст
import { ADMIN_ROUTE, BASKET_ROUTE, STATION_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"; // Импортируем маршруты
import '../styles/NavBar.css';
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
    const { user } = useContext(Context); // Получаем данные пользователя из контекста

    return (
        <nav>
            <ul>
                <li>
                    <Link to={STATION_ROUTE}>Station</Link> {/* Ссылка на страницу станции */}
                </li>
            </ul>
            <ul>                
                {user.isAuth ? ( // Проверяем, авторизован ли пользователь
                    <>
                        <li>
                            <Link to={ADMIN_ROUTE}>Admin</Link> {/* Ссылка на админскую страницу */}
                        </li>
                        <li>
                            <Link to={BASKET_ROUTE}>Basket</Link> {/* Ссылка на страницу корзины */}
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link> {/* Ссылка для выхода */}
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={LOGIN_ROUTE} onClick={() => user.setIsAuth(true)}>Login</Link> {/* Ссылка на страницу входа */}
                        </li>
                        <li>
                            <Link to={REGISTRATION_ROUTE}>Register</Link> {/* Ссылка на страницу регистрации */}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
});

export default NavBar;
