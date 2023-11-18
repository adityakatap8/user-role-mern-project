require('dotenv').config() // by doing this we can use dotenv throughout our application without including it in every file
const express = require("express");
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require ('./config/dbConn');
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV)
connectDB();

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

// this is an example of a built in middleware
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))


app.all('*', (req,res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({message: '404 not found'})
    } else {
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)
mongoose.connection.once('open', () => {

    console.log('Connected to mongoDB')
    app.listen(PORT, () => console.log(`server runnign on ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrorLog.log')
})
