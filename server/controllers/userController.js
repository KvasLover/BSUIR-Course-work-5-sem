const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/models')
const CurrentUser = require('../currentUser')

class UserController {
    async registration(req, res, next) {
        /*
        {
            "username": "net",
            "email": "net",
            "password": "net",
            "role": 2
        }
        */
        const {username, email, password, role} = req.body
        if(!username || !email || !password || !role) {
            return next(ApiError.badRequest('Некорректный ввод'))
        }
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))            
        }
        
        const candidate2 = await User.findOne({where: {email}})
        if (candidate2) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))            
        }

        const user = await User.create({username, email, password, role})
            return res.json(user);        
    }

    async getAll(req, res) {
        //return res.json({ message: 'Все работает' });
        const users = await User.findAll()
        return res.json(users)
    }
    
    async login(req, res, next) {
        const {username, email, password} = req.body
        
        if (CurrentUser.getUser() && CurrentUser.getUser().user && CurrentUser.getUser().user.username === username)
            return res.status(401).json({
                message: "Ты уже залогинился!"
            });
//t
        const user = await User.findOne({where: {username}})
        if(!user) {
            return next(ApiError.internal('Пользователь не найден')) 
        }
        //console.log(user);
        if(password !== user.password)
            return next(ApiError.internal('Неправильный пароль')) 

        CurrentUser.setUser({
            /*id: user.id,
            username: user.username,
            email: user.email,
            role: user.role // Сохраняем роль пользователя*/
            user
        });

        return res.status(200).json({
            message: "Залогинился!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role // Убедитесь, что роль сохраняется
            }
        });
    }

    async quit(req, res, next) {
        if (!CurrentUser.getUser())
            return res.status(204).json({
                message: "Ты и так не вошел!"
            });

        CurrentUser.setUser(
            /*id: user.id,
            username: user.username,
            email: user.email,
            role: user.role // Сохраняем роль пользователя*/
            null
        );

        return res.status(200).json({
            message: "Вышел!"
        });
    }

    async check(req, res, next) {
        const {id} = req.query
        if (!id) {
             return next(ApiError.badRequest('Не задан ID!'))
        }
        res.json(id)
    }
}

module.exports = new UserController()