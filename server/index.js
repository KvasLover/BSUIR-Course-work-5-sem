require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

/*
Простейший get запрос на сервер

app.get('/', (req, res) => {
    res.status(200).json({message: "Working!!!"})
})
*/



const start = async() => {
    try{

        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()



