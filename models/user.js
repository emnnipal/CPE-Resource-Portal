var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

var User = new Schema({
	// username: {
	// 	type: String,
	// 	validate: {
 //        validator: function(v) {
 //            return /^[a-zA-z]{8,}$/.test(v);
 //          },
 //        message: 'Invalid Username!'
 //        }, 
	// },
    first_name: {
    	type: String,
    	validate: nameValidator
    },
    last_name: String,
    // email: String,
    email: {
    	type: String,
    	// validate: {
     //    validator: function(v) {
     //        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
     //      },
     //    message: 'Invalid Email!'
     //    }, 
    },
    birthdate: Date
}, { collection: 'users' });

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);