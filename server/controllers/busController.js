const {Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class BusController {
    async create(req, res) {
        try {
            const {serial_num, model, type, year, seats} = req.body

            const existingBus = await Bus.findOne({ where: { model } });
            if (existingBus) {
                return res.status(400).json({ message: 'Автобус с такой моделью уже существует.' });
            }
            
            const bus = await Bus.create({serial_num, model, type, year, seats})
            return res.json(bus);
        } catch (error) {
            console.error('Error creating bus:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        //return res.json({ message: 'Все работает' });
        const buses = await Bus.findAll()
        return res.json(buses)
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