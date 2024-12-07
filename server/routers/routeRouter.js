const Router = require('express')
const router = new Router()
const routeController = require('../controllers/routeController')


router.post('/',routeController.create)
router.get('/',routeController.getAll)
router.get('/:id',routeController.getOne)
router.delete('/', routeController.deleteAll)
// доработать метод delete по такому же принципу 26:53


module.exports = router