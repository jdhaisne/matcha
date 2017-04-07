var express = require('express')
var	router = express.Router()
var bcrypt = require('bcrypt')
var	bodyParser = require('body-parser')
var db = require('../db')
var htmlspecialchars = require('htmlspecialchars')
var users = require('../models/users')

var urlencodedParser = bodyParser.urlencoded({ extended: false})

db.connect(function(err) {
	if(err) {
		console.log('Unable to connect to MySQL.')
    	process.exit(1)
	}
})

router.get('/', function(req, res) {
	console.log('register')
	res.render('register', { title: 'register'})
})

router.post('/', urlencodedParser, function(req, res) {
	if(!req.body) return res.sendStatus(400)
		bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(req.body.password === req.body.password_verif){
			console.log('adding')
			console.log(hash)	
			users.add({
				"pseudo": htmlspecialchars(req.body.pseudo),
				"password": hash
			}, function(err, insertId) {
				if(err) throw err
				else
					console.log('added at id='+insertId)
			})
		}
	})
	res.end(req.body.password)
})

module.exports = router