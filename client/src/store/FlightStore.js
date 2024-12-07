import {makeAutoObservable} from "mobx"

//поменял UserStore на FlightStore 
export default class FlightStore  {
    constructor() {
        this._flights = [
            {"id": 1,
        "route_id": 11,
        "bus_id": 3,
        "service_id": 1,
        "time_in_ride": "1 час",
        "start_time": "10:00",
        "finish_time": "11:00",
        "date": "01.01.2025",
        "free_seats": 10,
        "price": "300 bucks"},
        {"id": 2,
        "route_id": 22,
        "bus_id": 2,
        "service_id": 2,
        "time_in_ride": "1 час",
        "start_time": "10:00",
        "finish_time": "11:00",
        "date": "01.01.2025",
        "free_seats": 10,
        "price": "300 bucks"}
        ]
        this._tickets = [
            {"id": 2,
            "flight_id": 17,
            "seat_number": "3",
            "ticket_status": 1,
            "img": "1a9a907b-c702-475d-8db4-c9c630c72fb5.jpg"},
        {"id": 1,
            "flight_id": 16,
            "seat_number": "3",
            "ticket_status": 1,
            "img": "08a2fd44-140b-41e2-ae21-24ee47c6e60d.jpg"}
        ]
    
        makeAutoObservable(this)
    }

    setFlights(flights) {
        this._flights = flights
    }
    setTickets(tickets) {
        this._tickets = tickets
    }

    get flights() {
        return this._flights
    }
    get tickets() {
        return this._tickets
    }
}