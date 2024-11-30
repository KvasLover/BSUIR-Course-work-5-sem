const Router = require('express')
const router = new Router()
const busController = require('../controllers/busController')


router.post('/',busController.create)
router.get('/',busController.getAll)
// доработать метод delete по такому же принципу 26:53


module.exports = router