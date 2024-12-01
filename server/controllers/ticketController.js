/*const {Flight, Ticket} = require('../models/models')
const ApiError = require('../error/ApiError')*/
const uuid = require('uuid')
const path = require('path')

class TicketController {
    async create(req, res) {
        const {flight_id, seat_number, ticket_status} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    async getAll(req, res) {
        const tickets = await Ticket.findAll()
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