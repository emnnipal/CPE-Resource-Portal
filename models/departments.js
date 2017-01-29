var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
  // id is created automatically
  // name: String,
  // job: String,
  // nickname: String,
  // email: String,
  // notes: [{
  //   postedDate: {
  //     type: Date,
  //     'default': Date.now
  //   },
  //   note: String
  // }]


  dep_name: {
      type: String,
      required: [true, 'Please fill the Department Name']
      },
  abbrv: {
      type: String,
      required: [true, 'Please fill the Abbreviation']
      },
  head: {
      type: String,
      required: [true, 'Please fill the Secretary/head']
      },
  website: String,
  contact: String,
  createdate: String,
  updatedate: String,
  fb:String,
  tw:String,
  picture:String,
}, { collection: 'module4' });

module.exports = mongoose.model('Department', departmentSchema);