const {Flight} = require('../models/models')
const ApiError = require('../error/ApiError')

class FlightController {
    async create(req, res) {
        const {route_id} = req.body
        
        const {bus_id} = req.body

        const {service_id} = req.body

        const {time_in_ride} = req.body

        const {start_time} = req.body

        const {finish_time} = req.body

        const {date} = req.body

        const {free_seats} = req.body

        const {price} = req.body        
        const flight = await Flight.create({route_id, bus_id, service_id, time_in_ride, start_time, finish_time, date, free_seats, price})
        
        return res.json(flight)

    }

    async getAll(req, res) {
        
    }
}

module.exports = new FlightController()