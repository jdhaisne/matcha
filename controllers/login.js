var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var bodyParser = require('body-parser')
var db = require('../db')
var htmlspecialchars = require('htmlspecialchars')
var users = require('../models/users')

var urlencodedParser = bodyParser.urlencoded({ extended: false})

db.connect(function(err) {
	if(err) {
		console.log('unable to connect to MYSQL')
		process.exit(1)
	}
})

router.get('/', function(req, res) {
	console.log('login')
	req.session.try = 1
	res.render('login', { title: 'login'})
})

router.post('/', urlencodedParser, function(req, res) {

	if(!req.body) return res.sendStatus(400)
	users.login(req.body.pseudo, function(err, rows) {
		if(err) throw err
		else if(rows.length) {
			bcrypt.compare(req.body.password, rows[0].password, function(err, res) {
				if(res) {
					req.session.userId = rows[0].id
					req.session.pseudo = rows[0].pseudo
					req.session.save()
					console.log(rows)
					console.log(req.session)
				}
				else
					console.log('wrong auth')
			})	
		}
		else
			console.log('wrong auth')
	})
	res.redirect('/')
})

module.exports = router