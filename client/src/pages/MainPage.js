import React, { /*useState, */useContext } from 'react';
import Records from "../components/Records"; // Импортируем Records
import { Context } from "..";

const MainPage = () => {
    const { user } = useContext(Context);

    return (
        <div>
            <h2>Главная</h2>
            
        </div>
    );
}

export default MainPage;
