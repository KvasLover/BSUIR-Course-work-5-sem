import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import FlightItem from "./FlightItem"; // Импортируем компонент FlightItem
import { useLocation, useNavigate } from "react-router-dom"; // Импортируем useLocation и useNavigate
import '../styles/Station.css'; // Импортируем стили

const Records = observer(() => {
    const { flight } = useContext(Context);
    const navigate = useNavigate(); // Получаем функцию навигации
    
    // Извлекаем параметры из URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const startLocation = queryParams.get('start');
    const finishLocation = queryParams.get('finish');
    const travelDate = queryParams.get('date');

    useEffect(() => {
        flight.loadFlights(); // Загружаем рейсы при монтировании компонента
    }, [flight]);

    // Фильтруем рейсы на основе переданных параметров
    const filteredFlights = (startLocation || finishLocation || travelDate)
        ? flight.flights.filter(flight => {
            return (
                (startLocation ? flight.start_location === startLocation : true) &&
                (finishLocation ? flight.finish_location === finishLocation : true) &&
                (travelDate ? flight.date === travelDate : true)
            );
        })
        : flight.flights; // Если ни один параметр отсутствует, показываем все рейсы

    // Обработчик для сброса параметров поиска
    const handleResetFilters = () => {
        navigate('/station'); // Перенаправляем на страницу расписания без параметров
    };

    return (
        <div className="records">
            <button onClick={handleResetFilters} className="reset-button">
                Сбросить параметры поиска
            </button>
            {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                    <FlightItem key={flight.id} flight={flight} /> // Проходимся по каждому отфильтрованному рейсу
                ))
            ) : (
                <p>Рейсы не найдены по заданным критериям.</p> // Сообщение, если рейсы не найдены
            )}
        </div>
    );
});

export default Records;
