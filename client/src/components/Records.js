import { observer } from "mobx-react-lite";
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

export default Records;
