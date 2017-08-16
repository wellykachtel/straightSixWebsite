var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

/* GET users listing. */
router.get('/newuser', function(req, res, next) {
  res.render('users/newuser', {title: 'Add New User'});
});

router.post('/adduser', function(req,res) {
	var db = req.db;

	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var email = req.body.email;
	var password = req.body.password;
	var password_confirm = req.body.password_confrim;
	var hashedPassword = passwordHash.generate(password);
	var cellphone = req.body.cellphone;
	var level = req.body.level;
	var positions = [];
	if(req.body.OH){
		positions.push("Outside Hitter");
	}
	if(req.body.MH){
		positions.push("Middle Hitter");
	}
	if(req.body.RH){
		positions.push("Rightside Hitter");
	}
	if(req.body.SE){
		positions.push("Setter");
	}
	if(req.body.DS){
		positions.push("Defensive Specialist");
	}
	console.log(positions);

	var collection = db.get('users');
	collection.insert({
		"first_name": firstName,
		"last_name": lastName,
		"email": email,
		"password_hash" : hashedPassword,
		"cellphone": cellphone,
		"level": level,
		"positions": positions,
		"date_created": new Date()
	},function(err,doc) {
		if(err) {
			res.send("There was a problem adding the information to the database");
		} else {
			res.redirect("/userlist");
		}
	});
});


module.exports = router;
