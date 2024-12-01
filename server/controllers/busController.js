const {Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class BusController {
    async create(req, res) {
        const {model} = req.body

               
        const bus = await Bus.create({model})
        
        return res.json(bus)

    }

    async getAll(req, res) {
        return res.json({ message: 'Все работает' });
    }
}

module.exports = new BusController()