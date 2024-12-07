/*// src/pages/Bus.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Для получения параметров из URL
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const BusPage = observer(() => {
    const { id } = useParams(); // Получаем ID автобуса из URL
    const { bus } = useContext(Context); // Получаем контекст BusStore

    const selectedBus = bus.getBusById(Number(id)); // Получаем автобус по ID

    useEffect(() => {
        if (!selectedBus) {
            console.log("Автобус не найден");
        }
    }, [selectedBus]);

    return (
        <div className="bus-page">
            {selectedBus ? (
                <>
                    <h2>Информация об автобусе</h2>
                    <p>ID: {selectedBus.id}</p>
                    <p>Серийный номер: {selectedBus.serial_num}</p>
                    <p>Модель: {selectedBus.model}</p>
                    <p>Тип: {selectedBus.type}</p>
                    <p>Год выпуска: {selectedBus.year}</p>
                    <p>Количество мест: {selectedBus.seats}</p>
                </>
            ) : (
                <h2>Автобус не найден</h2>
            )}
        </div>
    );
});

export default BusPage;
*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Для получения параметров из URL
import { fetchBus } from '../http'; // Импортируйте функцию для получения автобуса

const BusPage = () => {
    const { id } = useParams(); // Получаем ID автобуса из URL
    const [bus, setBus] = useState(null); // Состояние для хранения данных автобуса
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    useEffect(() => {
        const getBus = async () => {
            try {
                const data = await fetchBus(id); // Получаем данные о автобусе по ID
                setBus(data); // Устанавливаем данные в состояние
            } catch (err) {
                setError(err.message); // Устанавливаем сообщение об ошибке
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        getBus(); // Вызываем функцию получения данных о автобусе
    }, [id]); // Зависимость от ID автобуса

    if (loading) return <div>Загрузка...</div>; // Отображаем сообщение о загрузке
    if (error) return <div>Ошибка: {error}</div>; // Отображаем сообщение об ошибке

    return (
        <div>
            <h2>Информация об автобусе</h2>
            {bus && (
                <>
                    <p>ID: {bus.id}</p>
                    <p>Серийный номер: {bus.serial_num}</p>
                    <p>Модель: {bus.model}</p>
                    <p>Тип: {bus.type}</p>
                    <p>Год выпуска: {bus.year}</p>
                    <p>Количество мест: {bus.seats}</p>
                </>
            )}
        </div>
    );
};

export default BusPage;
