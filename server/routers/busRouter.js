const Router = require('express')
const router = new Router()
const busController = require('../controllers/busController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', /*checkRole(1), */busController.create)
router.get('/',busController.getAll)
router.get('/:id',busController.getOne)
router.delete('/', busController.deleteAll)
router.patch('/', busController.patchBus)
// доработать метод delete по такому же принципу 26:53


module.exports = router