// src/currentUser.js
class CurrentUser {
    static user = null;

    static setUser(user) {
        this.user = user;
    }

    static getUser() {
        return this.user;
    }

    static getRole() {
        return this.user ? this.user.role : null; // Предполагается, что role — это поле в объекте user
    }
}

export default CurrentUser;
