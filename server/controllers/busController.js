const {Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class BusController {
    async create(req, res) {
        try {
            const {id, serial_num, model, type, year, seats} = req.body

            const existingBus = await Bus.findOne({ where: { model } });
            if (existingBus) {
                return res.status(400).json({ message: 'Автобус с такой моделью уже существует.' });
            }
            
            const bus = await Bus.create({id, serial_num, model, type, year, seats})
            return res.json(bus);
        } catch (error) {
            console.error('Error creating bus:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const {id}= req.params
        const bus = await Bus.findOne(
            {
                where: {id}
            }
        )
        return res.json(bus)
    }

    async getAll(req, res) {
        const buses = await Bus.findAll()
        return res.json(buses)
    }

    async patchBus(req,res) {
        const { id } = req.body
        const bus = await Bus.findOne({
            where: {id}
        })

        if(!bus) {
            return res.status(500).json({ message: 'Такого автобуса нет!' });
        }

        if(req.body.img) {
            bus.img = req.body.img
        }
        
        await bus.save();

        return res.json(bus)
    }

    async deleteAll(req, res) {
        try {
            await Bus.destroy({
                where: {}, // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: 'Все записи успешно удалены.' });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
    }
}

module.exports = new BusController()