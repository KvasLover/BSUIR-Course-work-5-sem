const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
//const UserController = require('../controllers/userController')???????

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

/*
Простейший запрос для проверки навигации

router.get('/auth', (reqq, res) => {
    res.json({message: 'all working'})
})
*/

// доработать метод delete по такому же принципу 26:53


module.exports = router