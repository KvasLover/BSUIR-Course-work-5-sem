import React from "react";
import '../styles/Station.css'

const TicketItem = ({ ticket }) => {
    return (
        <div className="ticket-item">
            <img src={ticket.img} alt={`Ticket ${ticket.id}`} style={{ width: '100px', height: 'auto' }} />
            <div>
                <h4>Билет ID: {ticket.id}</h4>
                <p>Место: {ticket.seat_number}</p>
                <p>Статус: {ticket.ticket_status === 1 ? 'Доступен' : 'Недоступен'}</p>
                {/* Добавьте другие поля, если нужно */}
            </div>
        </div>
    );
}

export default TicketItem;
