var express = require('express')
var mysql = require('mysql')
var router = express.Router()


router.get('/', function(req, res) {
	var connection = mysql.createConnection({
		host: 'localhost',
		port: 3307,
		user: 'jdhaisne',
		password: ''	
	})
	connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
		if(err) throw err
		console.log('connected')
		connection.query('USE test', function (err) {
			if(err) throw err
			console.log('using test')
			connection.query('CREATE TABLE IF NOT EXISTS users('
				+ 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
				+ 'pseudo VARCHAR(30) NOT NULL,'
				+ 'password VARCHAR(255) NOT NULL,'
				+ 'dateCreation VARCHAR(100) NOT NULL)'
				,function(err) {
					if(err) throw err
				})
			console.log('done');
		})
	})
})

module.exports = router