import React from "react";
import Records from "../components/Records"; // Импортируем Records

const Station = () => {
    return (
        <div>
            <h2>Расписание</h2>
            <Records /> {/* Отображаем список рейсов */}
        </div>
    );
}

export default Station;
