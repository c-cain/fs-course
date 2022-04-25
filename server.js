// Check if the server is running in the production environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

// Setting up the application
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Connecting to the database
const mongoose = require('mongoose') 
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true 
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose Connection Successful'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)