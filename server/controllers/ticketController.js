const {Ticket} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class TicketController {
    
    async create(req, res, next) {
        try {
            const {flight_id, seat_number, ticket_status} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            
            const ticket = await Ticket.create({
                flight_id, seat_number, ticket_status, img: fileName
            })
            
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