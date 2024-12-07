// src/pages/Bus.js
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
