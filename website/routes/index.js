var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');




/* GET home page. */
router.get('/', function(req, res, next) {
	var collection = req.db.get('users');

	if(req.session && req.session.user) {
		collection.findOne({'email': req.session.user.email}, function(err,user) {
			if(!user) {
				req.session.reset();
				res.redirect('/login');
			} else {
				res.render('index', {
					title: 'Home',
					alertText: '<h2>Welcome to Straight Six Volleyball '
					+ user.first_name +
					'!</h2> <p>All tournaments are by invitation only. If you would like to be contacted, please follow the sign up link above.</p>'
				});
			}
		})
	} else {
		//res.redirect('/login');

		res.render('index', {
			title: 'Home',
			alertText: '<h2>Welcome to Straight Six Volleyball!</h2> <p>All tournaments are by invitation only. If you would like to be contacted, please follow the sign up link above.</p>'
		});
	}
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login-process', function(req, res) {
	var db = req.db;
	var collection = db.get('users');
	var email = req.body.email;
	var password = req.body.password;
	collection.findOne({'email': email}, function(err, user) {
		if(!user) {
			console.log('no user');
			res.render('login', {title: 'Login', loginError: 'Invalid email or password'});
		} else {
			if(passwordHash.verify(password, user.password_hash)) {
				req.session.user = user;
				res.redirect('/');
			} else {
				console.log('bad password');
				res.render('login', {title: 'Login', loginError: 'Invalid email or password'});
			}
		}
	});

});

router.get('/logout', function(req,res,next) {
	req.session.reset();
	res.redirect('/');
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign Up'})
});

router.get('/userlist', requireLogin, function(req,res) {
	var db = req.db;
	var collection = db.get('users');
	collection.find({},{}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

//router.get('/newuser', function(req, res) {
	//res.render('newuser', {title: 'Add New User'});
//});

function requireLogin(req,res,next) {
  if(!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}


module.exports = router;
