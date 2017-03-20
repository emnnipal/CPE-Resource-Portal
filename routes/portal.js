var express = require('express');
var router = express.Router();
var Subject = require('../models/subjects');
var Item = require('../models/item');
var moment = require('moment-timezone');
var User = require('../models/user');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Subject.find( function(err, data, count) {
    res.render('subjects', {subjects: data,user:req.user});
  })
});
router.post('/', function(req, res){
  res.redirect('/portal')
});
	
router.route('/:subjectId')
  .all(function(req, res, next) {
    subjectId = req.params.subjectId;
    subject = {};
    Subject.findById(subjectId, function(err, data) { 
      subject = data;
      Item.find(function(err,data){
      items = [];
      if(err){
        res.render('subjectdata', {error: err});
      }
      else{
        // for(let x=0;x<data.length;x++){
        //     if(subject.code===data[x].subject){
        //         filtered.push(data[x]);
        //     }
        // }
        items = data;
      }
      if(data){
        next();
      }
      });
      
    });
    
  })
  .get(function(req, res) {
    res.render('subjectdata', {subjectdata: subject, moment:moment,items: items,user:req.user});
  })


module.exports = router;
