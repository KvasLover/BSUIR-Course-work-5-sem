const Router = require('express')
const router = new Router()


router.post('/registration',)
router.post('/login',)
router.get('/auth', (reqq, res) => {
    res.json({message: 'all working'})
})
// доработать метод delete по такому же принципу 26:53


module.exports = router