import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Измените Switch на Routes
import { authRoutes, publicRoutes } from "../routes";
import { Context } from '..';

const AppRouter = () => {
    //const isAuth = false; // Замените это на вашу логику аутентификации
const {user} = useContext(Context)
console.log(user)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} /> // Используйте element вместо component
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} /> // Используйте element вместо component
            ))}
            {/* Добавьте редирект или другие маршруты по умолчанию, если необходимо */}
            <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправление по умолчанию */}
        </Routes>
    );
};

export default AppRouter;
