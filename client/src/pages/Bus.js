import '../styles/Bus.css'; // Импортируем стили
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { fetchBus } from '../http'; 

const Bus = () => {
    const { id } = useParams(); 
    const [bus, setBus] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getBus = async () => {
            try {
                const data = await fetchBus(id); 
                setBus(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        getBus(); 
    }, [id]); 

    if (loading) return <div className="loading-message">Загрузка...</div>; 
    if (error) return <div className="error-message">Ошибка: {error}</div>; 
    
    const imageUrl = bus ? `http://localhost:5000/static/${bus.img}` : '';

    return (
        <div className="bus-container">
            <div className="bus-info">
                <h2 className="bus-title">Информация об автобусе</h2>
                {bus && (
                    <>
                        <p className="bus-info">Серийный номер: {bus.serial_num}</p>
                        <p className="bus-info">Модель: {bus.model}</p>
                        <p className="bus-info">Тип: {bus.type}</p>
                        <p className="bus-info">Год выпуска: {bus.year}</p>
                        <p className="bus-info">Количество мест: {bus.seats}</p>
                    </>
                )}
            </div>
            {bus && (
                <img src={imageUrl} alt={bus.model} className="bus-image" /> 
            )}
        </div>
    );
};

export default Bus;
