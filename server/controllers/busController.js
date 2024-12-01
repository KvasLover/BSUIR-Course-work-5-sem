const {Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class BusController {
    async create(req, res) {
        try {
            const {serial_num, model, type, year, seats} = req.body

               
        const bus = await Bus.create({serial_num, model, type, year, seats})
            return res.json(bus);
        } catch (error) {
            console.error('Error creating flight:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        //return res.json({ message: 'Все работает' });
        const buses = await Bus.findAll()
        return res.json(buses)
    }
}

module.exports = new BusController()