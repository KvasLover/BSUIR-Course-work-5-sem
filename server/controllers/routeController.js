const {Route} = require('../models/models')
const ApiError = require('../error/ApiError')

class RouteController {
    async create(req, res) {
        try {
            const {start_location, finish_location, number} = req.body

               
        const route = await Route.create({start_location, finish_location, number})
            return res.json(route);
        } catch (error) {
            console.error('Error creating flight:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const {id}= req.params
        const route = await Route.findOne(
            {
                where: {id}
            }
        )
        return res.json(route)
    }

    async getAll(req, res) {
        //return res.json({ message: 'Все работает' });
        const routes = await Route.findAll()
        return res.json(routes)
    }

    async deleteAll(req, res) {
        try {
            await Route.destroy({
                where: {}, // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: 'Все записи успешно удалены.' });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
    }
}

module.exports = new RouteController()