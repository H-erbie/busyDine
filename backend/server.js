require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const userRouter = require('./routes/auth')
const dishRouter = require('./routes/dishes')
const orderRouter = require('./routes/orders')
const drinkRouter = require('./routes/drinks')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const auth = require('./middleware/auth')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use('uploads',express.static('uploads'))
app.use('/api/v1/auth', userRouter)
app.use('/api/dishes', dishRouter)
app.use('/api/drinks', drinkRouter)
app.use('/api/orders', auth, orderRouter)

app.use(errorHandler)
app.use(notFound)

// start server and connect DB
const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_DB_CONNECTION_STRING)
        app.listen(port, ()=> {
            console.log(`server is listening on port ${port}...`)
        })
        
    } catch (error) {
        console.log(error)
    }
}
startServer()


