var db = require('../db')

exports.add = function(user, cb) {
	var values = [user.pseudo, user.password, new Date().toISOString()]
	db.get().query('INSERT INTO users(pseudo, password, dateCreation)'
					+ 'VALUES(?, ?, ?)', values, function(err, result) {
						if(err) return cb(err)
						cb(null, result.insertId)
					})
}

exports.get = function($userId, cb) {
	var values = [userId]
	db.get().query('SELECT * FROM users WHERE id = ?', values, function(err, rows) {
		if(err) return cb(err)
		cb(null, rows)
	})
}

exports.login = function(login, cb) {
	// PENSER A HASHER LE MDP
	var values = [login]
	db.get().query('SELECT * FROM users WHERE pseudo = ?', values, function(err, rows) {
		if(err) return cb(err)
		cb(null, rows)
	})
}