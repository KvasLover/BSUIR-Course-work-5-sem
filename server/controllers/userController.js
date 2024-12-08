const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/models')
const CurrentUser = require('../currentUser')
const bcrypt = require('bcrypt')
/*
        {
            "username": "net",
            "email": "net",
            "password": "net",
            "role": 2
        }
        */
class UserController {
    async registration(req, res, next) {
        const {id, username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return next(ApiError.badRequest('Некорректный ввод'));
        }

        const candidate = await User.findOne({ where: { username } });
        const candidate2 = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует!'));
        }
        if (candidate2) {
            return next(ApiError.badRequest('Пользователь с такой почтой уже существует!'));
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
        const user = await User.create({id, username, email, password: hashedPassword , role});
        return res.json(user);
    }            

    async getAll(req, res) {
        //return res.json({ message: 'Все работает' });
        const users = await User.findAll()
        return res.json(users)
    }
    
    async login(req, res, next) {
        const { username, password } = req.body;
        
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        const isMatch = await bcrypt.compare(password, user.password); // Сравниваем пароли
        if (!isMatch) {
            return next(ApiError.internal('Неправильный пароль'));
        }

        // Здесь вы можете установить сессию или токен для управления аутентификацией
        return res.status(200).json({
            message: "Залогинился!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
        
    async patchUser(req,res) {
        const { id } = req.body
        const user = await User.findOne({
            where: {id}
        })

        if(!user) {
            return res.status(500).json({ message: 'Такого пользователя нет!' });
        }

        if(req.body.role) {
            user.role = req.body.role
        }
        
        await user.save();

        return res.json(user)
    }       

    async deleteAll(req, res) {
        const {id}= req.params
        try {
            await User.destroy({
                where: {} // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: 'Все записи удалены' });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
    }  

    async deleteOne(req, res) {
        const {id}= req.params
        try {
            await User.destroy({
                where: {id} // Указывает, что мы хотим удалить все записи
            });
            return res.json({ message: `Пользователь с id ${id} удален` });
        } catch (error) {
            console.error('Ошибка при удалении записей:', error);
            return res.status(500).json({ message: 'Ошибка при удалении записей.' });
        }
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