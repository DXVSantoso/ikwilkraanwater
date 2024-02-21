const express = require('express')
const dotenv = require('dotenv').config
require('dotenv').config
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.port || 5000
const colors = require('colors')
const connectDatabase = require('./config/db')
const app = express()

connectDatabase()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`))
