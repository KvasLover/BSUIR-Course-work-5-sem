import {makeAutoObservable} from "mobx"
import { fetchFlights } from "../http"

//поменял UserStore на FlightStore 
export default class FlightStore  {
    constructor() {
        this._flights = []
        makeAutoObservable(this)
    }

    setFlights(flights) {
        this._flights = flights
    }

    get flights() {
        return this._flights
    }

    async loadFlights() {
        const flights = await fetchFlights(); // Получаем рейсы из API
        this.setFlights(flights); // Устанавливаем рейсы в состояние
    }
}