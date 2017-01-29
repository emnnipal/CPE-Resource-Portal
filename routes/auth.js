var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email
                            }), req.body.password, function(err, account) {
      if(err) {
        console.log(err)
        // var eArr = [];
        // for(var e of Object.keys(err.errors)){ 
        //     eArr.push(e);
        // }
        // return res.render('register', {account: account, error:err.errors[eArr[0]].message});
        return res.render('register', {account: account, error:err});
      }

      req.login(account, function(err) {
        res.redirect('/');
      });
    })
  })
router.get('/log-in', function(req, res, next) {
  res.render('log-in', {user: req.user});

});

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { 
//         console.log(err);
//         return res.render('login', {error:err}); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/log-in'}),
  function(req, res) {
    res.redirect('/');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;