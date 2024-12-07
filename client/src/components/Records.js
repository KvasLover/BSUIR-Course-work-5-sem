/*import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import TicketItem from "./TicketItem"; // Импортируем компонент TicketItem
import '../styles/Station.css'

const Records = observer(() => {
    const { ticket } = useContext(Context);

    return (
        <div className="records">
            {ticket.tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} /> // Проходимся по каждому билету
            ))}
        </div>
    );
});

export default Records;*/

import { observer } from "mobx-react-lite";
import { useContext, useEffect  } from "react";
import { Context } from "..";
import FlightItem from "./FlightItem"; // Импортируем компонент FlightItem
import '../styles/Station.css'; // Импортируем стили

const Records = observer(() => {
    const { flight } = useContext(Context);

    useEffect(() => {
        flight.loadFlights(); // Загружаем рейсы при монтировании компонента
    }, [flight]);
    
    return (
        <div className="records">
            {flight.flights.map((flight) => (
                <FlightItem key={flight.id} flight={flight} /> // Проходимся по каждому рейсу
            ))}
        </div>
    );
});

export default Records;


