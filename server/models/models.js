const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}, 
    role: {type: DataTypes.INTEGER, defaultValue: 2}
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    user_id: {type: DataTypes.INTEGER},
    message: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketTicket = sequelize.define('basket_ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}   
})

const Ticket = sequelize.define('ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    flight_id: {type: DataTypes.INTEGER, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},    
    seat_number:  {type: DataTypes.STRING, allowNull: false},
    ticket_status: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Flight = sequelize.define('flight', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    route_id: {type: DataTypes.INTEGER},    
    bus_id: {type: DataTypes.INTEGER},    
    service_id: {type: DataTypes.INTEGER},    
    time_in_ride: {type: DataTypes.STRING},    
    start_time: {type: DataTypes.STRING},
    finish_time: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
    free_seats: {type: DataTypes.INTEGER},
    price: {type: DataTypes.STRING}
})

const Bus = sequelize.define('bus', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    serial_num: {type: DataTypes.STRING},
    model: {type: DataTypes.STRING, unique: true},
    type: {type: DataTypes.INTEGER},
    year: {type: DataTypes.INTEGER},
    seats: {type: DataTypes.INTEGER}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Basket.hasMany(BasketTicket)
BasketTicket.belongsTo(Basket)

BasketTicket.hasOne(Ticket)
Ticket.belongsTo(BasketTicket)

Flight.hasMany(Ticket)
Ticket.belongsTo(Flight)

Bus.hasMany(Flight)
Flight.belongsTo(Bus)

module.exports = {
    User, 
    Review, 
    Basket, 
    BasketTicket, 
    Ticket, 
    Flight, 
    Bus
}


/*
BasketTicket = BasketDevice
Ticket = Device
Flight = Type
Bus != Brand
Review = Rating
*/

/*
bus_id
serial_num
model
type
year
seats
*/

/*
flight_id
route_id
bus_id
service_id
time_in_ride
start_time
finish_time
date
free_seats
price
*/

/* 
Ticket
ticket_id
flight_id
user_id
seat_number
ticket_status
img?
*/

