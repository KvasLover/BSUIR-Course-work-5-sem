import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false; // Изначально не авторизован
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool; // Устанавливаем состояние аутентификации
    }

    setUser(user) {
        this._user = user; // Устанавливаем данные пользователя
    }

    get isAuth() {
        return this._isAuth; // Возвращаем состояние аутентификации
    }

    get user() {
        return this._user; // Возвращаем данные пользователя
    }
}
