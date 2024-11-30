const Router = require('express')
const router = new Router()
const ticketRouter = require('./ticketRouter')
const userRouter = require('./userRouter')
const busRouter = require('./busRouter')
const flightRouter = require('./flightRouter')

router.use('/user', userRouter)
router.use('/bus', busRouter)
router.use('/flight', flightRouter)
router.use('/ticket', ticketRouter)
ticketRouter

module.exports = router