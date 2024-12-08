const {Flight, Bus} = require('../models/models')
const ApiError = require('../error/ApiError')

class FlightController {
    async create(req, res) {
        /*const {route_id,bus_id,service_id,time_in_ride,start_time,finish_time,date,free_seats,price} = req.body           
        const flight = await Flight.create({route_id, bus_id, service_id, time_in_ride, start_time, finish_time, date, free_seats, price})
        */       
        /*try {
            const { free_seats } = req.body;
            const flight = await Flight.create({ free_seats });
            return res.json(flight);
        } catch (error) {
            console.error('Error creating flight:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }*/

        try {
            const {route_id,bus_id,service_id,time_in_ride,start_time,finish_time,date,free_seats,price} = req.body

               
        const flight = await Flight.create({route_id, bus_id, service_id, time_in_ride, start_time, finish_time, date, free_seats, price})
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