// src/store/BusStore.js
import { makeAutoObservable } from "mobx";

export default class BusStore {
    constructor() {
        this._buses = [];
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
