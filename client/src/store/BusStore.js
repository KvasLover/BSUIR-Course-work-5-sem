// src/store/BusStore.js
import { makeAutoObservable } from "mobx";

export default class BusStore {
    constructor() {
        this._buses = [
            {
                id: 2,
                serial_num: "AB123CD",
                model: "Mercedes-Benz",
                type: 1,
                year: 2018,
                seats: 50
            },
            {
                id: 3,
                serial_num: "EF456GH",
                model: "Volvo",
                type: 2,
                year: 2020,
                seats: 45
            }
        ];
        makeAutoObservable(this);
    }

    setBuses(buses) {
        this._buses = buses;
    }

    get buses() {
        return this._buses;
    }

    getBusById(id) {
        return this._buses.find(bus => bus.id === id);
    }
}
