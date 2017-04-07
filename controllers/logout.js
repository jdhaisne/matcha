var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
	req.session.destroy(function(err) {
		if(err) throw err
		else
		console.log('session destroyed')
	})
	res.redirect('/')
})

module.exports = router