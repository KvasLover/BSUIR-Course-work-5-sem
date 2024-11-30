const Router = require('express')
const router = new Router()
const ticketController = require('../controllers/ticketController')


router.post('/',ticketController.create)
router.get('/',ticketController.getAll)
router.get('/:id',ticketController.getOne)
// доработать метод delete по такому же принципу 26:53


module.exports = router