var express = require('express');
const connection = require('../dbConfig');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login/loginForm');
});

router.post('/auth', function(request, response) {
	var username = request.body.u_adm;
	var password = request.body.p_adm;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				// response.send('nyoba');
				response.redirect('/admin/Dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/auth', function(request, response) {
	response.send("UAAAA");
	response.end();
});

router.get('/Dashboard',function(request,response){
	response.send('TEST Dashboard');
	response.end();
});

module.exports = router;
