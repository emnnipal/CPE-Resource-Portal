var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  description: {
      type: String,
      required: [true, 'Please fill the description']
      },
  type: {
      type: String,
      required: [true, 'Please fill the type.']
      },
  link: {
      type: String,
      required: [true, 'Please fill the link.']
      },
  subject:{
        type: String, ref: 'code',
        required: [true,"Subject code is undefined"]
    },
  approval:{
        type: String,
    },
  createdate: Date,
  updatedate: String,
}, { collection: 'item' });

module.exports = mongoose.model('Item', itemSchema);