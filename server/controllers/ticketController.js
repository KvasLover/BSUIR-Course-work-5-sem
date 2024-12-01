const {Ticket, Flight, Route} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class TicketController {
    
    async create(req, res, next) {
        try {
            let {flight_id, seat_number, ticket_status, flight_info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
                  

            const ticket = await Ticket.create({flight_id, seat_number, ticket_status, img: fileName})
            
            if(flight_info) {
                flight_info = JSON.parse(flight_info)
                flight_info.forEach(i => {
                    Flight.create({
                        route_id: i.route_id,
                        bus_id: i.bus_id,
                        service_id: i.service_id,
                        time_in_ride: i.time_in_ride,
                        start_time: i.start_time,
                        finish_time: i.finish_time,
                        date: i.date,
                        free_seats: i.free_seats,
                        price: i.price,
                        ticketId: ticket.id
                    })                    
                });
            }
            
            return res.json(ticket)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // С возможностью фильтра по рейсам и задания
    // лимита билетов на странице и номера текущей страницы
    async getAll(req, res) {
        let {flight_id, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let tickets
        if (!flight_id) {
            tickets = await Ticket.findAndCountAll({limit, offset})
        }
        if (flight_id) {
            tickets = await Ticket.findAndCountAll({where: {flight_id}, limit, offset})
        }
        
       //const tickets = await Ticket.findAll()
        
        return res.json(tickets)
    }

    async getOne(req, res) {
        const {id}= req.params
        const ticket = await Ticket.findOne(
            {
                where: {id},
                include: [{model: Flight, as: 'flight_info'}]
            }
        )
        return res.json(ticket)
    }

    async deleteAll(req, res) {
        try {
            await Ticket.destroy({
                where: {}, // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: 'Все записи успешно удалены.' });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
    }
}

module.exports = new TicketController()

/*
    flight_id: {type: DataTypes.INTEGER, allowNull: false},
    //user_id: {type: DataTypes.INTEGER, allowNull: false},    
    seat_number:  {type: DataTypes.STRING, allowNull: false},
    ticket_status: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
*/