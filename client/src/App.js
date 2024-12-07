import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Импортируем NavBar
import AppRouter from './components/AppRouter'; // Ваш маршрутизатор

function App() {
    return (
        <Router>
            <NavBar /> {/* Вставляем NavBar */}
            <AppRouter /> {/* Ваш маршрутизатор */}
        </Router>
    );
}

export default App;
