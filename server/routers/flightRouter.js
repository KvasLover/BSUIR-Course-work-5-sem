const Router = require('express')
const router = new Router()
const flightController = require('../controllers/flightController')

router.post('/', flightController.create)
router.get('/',flightController.getAll)
router.delete('/', flightController.deleteAll)
router.get('/flights/model/:id', flightController.getModel);
// доработать метод delete по такому же принципу 26:53


module.exports = router