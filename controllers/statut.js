var express = require('express')
var	router = express.Router()

router.get('/', function(req, res) {
	console.log('check statut')
	console.log(req.session)
	if(req.session.userId)
		res.render('statut', { title: 'check statut', logged: true, pseudo: req.session.pseudo})
	else
		res.render('statut', { title: 'check statut'})
})

module.exports = router