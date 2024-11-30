const Router = require('express')
const router = new Router()
const flightController = require('../controllers/flightController')

router.post('/', flightController.create)
router.get('/',flightController.getAll)
// доработать метод delete по такому же принципу 26:53


module.exports = router