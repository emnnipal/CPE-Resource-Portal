var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
	username: {
		type: String,
        required: [true,'Username is required.'],
        minlength: [8, 'Username must be atleast 8 characters.'],
		validate: {
        validator: function(a) {
            return /^[a-zA-z]{1,}$/.test(a);
          },
        message: 'Username must be alpha characters only.'
        }, 
	},
    first_name: String,
    last_name: String,
    acctype: String,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Invalid format of email.'
        },
    }
}, { collection: 'users' });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);