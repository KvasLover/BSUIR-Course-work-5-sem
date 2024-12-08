const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
//const upload = require('../middleware/upload');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/quit', userController.quit)
router.delete('/', userController.deleteAll)
router.patch('/', userController.patchUser)
router.get('/', userController.getAll)
router.delete('/:id', userController.deleteOne)
//router.post('/upload', upload.single('image'), userController.uploadProfileImage);
/*
Простейший запрос для проверки навигации

router.get('/auth', (reqq, res) => {
    res.json({message: 'all working'})
})
*/

// доработать метод delete по такому же принципу 26:53


module.exports = router