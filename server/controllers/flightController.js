const {Flight, Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class FlightController {
    async create(req, res) {
        try {
            const {id, route_id, start_location, finish_location, bus_id, service_id, time_in_ride, start_time, finish_time, date, free_seats, price} = req.body

               
        const flight = await Flight.create({id, route_id, start_location, finish_location, bus_id, service_id, time_in_ride, start_time, finish_time, date, free_seats, price})
            return res.json(flight);
        } catch (error) {
            console.error('Error creating flight:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    }

    async getAll(req, res) {
        const flights = await Flight.findAll({
            //where: { bus_id }, // Фильтруем по bus_id
            include: [{ model: Bus,
                as: 'BusAliasForGettingBusModelInFlight'
             }] // Включаем данные об автобусах
        });
        return res.json(flights)
    }

    async getModel(req, res) {
        const { bus_id } = req.query;
        try {
            const flights = await Flight.findAll({
                //where: { bus_id }, // Фильтруем по bus_id
                include: [{ model: Bus }] // Включаем данные об автобусах
            });
            return res.json(flights);
        } catch (error) {
            console.error('Ошибка при получении рейсов:', error);
            return res.status(500).json({ message: 'Ошибка при получении рейсов' });
        }
    }
    
    async patchFlight(req, res) {
        const { id } = req.body
        const flight = await Flight.findOne({
            where: {id}
        })

        if(!flight) {
            return res.status(500).json({ message: 'Такого рейса нет!' });
        }

        if(req.body.date) {
            flight.date = req.body.date
        }
        
        await flight.save();

        return res.json(flight)
    }

    async deleteAll(req, res) {
        try {
            await Flight.destroy({
                where: {}, // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: 'Все записи успешно удалены.' });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
    }
}

module.exports = new FlightController()