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

router.route('/itemnew/:subjectId')
  .all(function(req, res, next) {
    subjectId = req.params.subjectId;
    subject = {};
    Subject.findById(subjectId, function(err, data) {
      subject = data;
      next();
    });
    
  })
  .post(function(req,res){
  if(req.user.acctype==='admin'){
    new Item({
        description: req.body.description,
        type: req.body.type,
        link: req.body.link,
        subject: subject.code,
        createdate: moment().tz("Asia/Manila").format('LLL'),
        approval: 'approved', 
      }).save(function(err, data, count) {
        if(err) {
          console.log(err)
          res.render('itemnew', {error:err})
        } else {
          // res.send("New Data created");
          res.redirect('/portal/'+subjectId)
        }
      })
    }else{
    new Item({
        description: req.body.description,
        type: req.body.type,
        link: req.body.link,
        subject: subject.code,
        createdate: moment().tz("Asia/Manila").format('LLL'),
        approval: '',
      }).save(function(err, data, count) {
        if(err) {
          console.log(err)
          res.render('itemnew', {error:err})
        } else {
          res.redirect('/portal/'+subjectId);
          // res.json({user:req.user});
          // res.render('subjects')
        }
      })
    }
  })
  .get(function(req, res) {
    res.render('itemnew', {subject: subject, moment:moment, user:req.user});
  })


	
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
