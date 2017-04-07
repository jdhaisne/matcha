var express = require('express')
var mysql = require('mysql')
var db = require('./db')
var session = require('express-session')


db.connect(function(err, connection) {
	if(err) throw err
	console.log('Your are connected')

})

var app = express()

app.use(session({
    secret: 'session_cookie_secret',
    resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('views', './views')

app.set('view engine', 'pug')

app.use(require('./controllers'))

app.listen(3000, function() {
	console.log('Listen on port 3000....')
})