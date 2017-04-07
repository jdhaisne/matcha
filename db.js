var mysql = require('mysql')

var state = {
	pool: null
}

exports.connect = function(done) {
	state.pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	port: 3307,
	user: 'jdhaisne',
	password: '',
	database: 'test'
	})
	done()
}

exports.get = function(){
	return state.pool
}