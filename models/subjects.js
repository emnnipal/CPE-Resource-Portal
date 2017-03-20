var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
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
  name: {
      type: String,
      required: [true, 'Please fill the Subject Name']
      },
  code: {
      type: String,
      required: [true, 'Please fill the Subject Code']
      },
  year: {
      type: String,
      required: [true, 'Please fill the Subject Year']
      },
  sem: {
      type: String,
      required: [true, 'Please fill the Subject Year']
      },
  createdate: Date,
  updatedate: String,
}, { collection: 'subjects' });

module.exports = mongoose.model('Subject', subjectSchema);