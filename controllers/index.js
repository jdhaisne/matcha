var express = require('express')
var router = express.Router()


router.use('/register', require('./register'))
router.use('/login', require('./login'))
router.use('/check_statut', require('./statut'))
router.use('/setup', require('../config/setup'))
router.use('/logout', require('./logout'))

router.get('/', function(req, res) {
	console.log('root')
	console.log(req.session)
	res.render('index', { title: 'home'})
})

module.exports = router