var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
	username: {
		type: String,
        required: [true,'Username is required.'],
		validate: {
        validator: function(a) {
            return /^[a-zA-z]{8,}$/.test(a);
          },
        message: 'Invalid Username.'
        }, 
	},
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Invalid Email.'
        },
    }
}, { collection: 'users' });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);