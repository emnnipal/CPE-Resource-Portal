var express = require('express');
var router = express.Router();
var Department = require('../models/departments');
var moment = require('moment-timezone');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Department.find( function(err, data, count) {
    res.render('departments', {departments: data});
  })
});
router.post('/', function(req, res){
  res.redirect('/departments')
});

router.post('/addnew', function(req, res) {
    new Department({
      dep_name: req.body.dep_name,
	    abbrv: req.body.abbrv,
	    head: req.body.head,
	    website: req.body.website,
	    contact: req.body.contact,
	    createdate: moment().tz("Asia/Manila").format('LLL'),
	    fb:req.body.fb,
	    tw:req.body.tw,
	    picture:req.body.picture,
    }).save(function(err, data, count) {
      if(err) {
        console.log(err)
        // res.status(400).send('Error saving new data: ' + err);
        // console.log(err)
        // var eArr = [];
        // for(var e of Object.keys(err.errors)){ 
        //     eArr.push(e);
        // }
        // res.render('addnew', {error:err.errors[eArr[0]]});
        // var e = err;
        // var a = e.splice(1,10);
        res.render('addnew', {error:err})
      } else {
        // res.send("New Data created");
        res.redirect('/departments')
      }
    })
});

router.get('/addnew', function(req, res) {
  res.render('addnew', {data: {}});
});
	
router.route('/:departmentId')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, data) {
      department = data;
      next();
    });
  })

  .get(function(req, res) {
    res.render('departmentdata', {departmentdata: department, moment:moment});
  })

  // .post(function(req, res) {
  //   department.notes.push({
  //     note: req.body.notes
  //   });

  //   contact.save(function(err, contact, count) {
  //     if(err) {
  //       res.status(400).send('Error adding note: ' + err);
  //     } else {
  //       res.send('Note added!');
  //     }
  //   });
  // })

router.route('/:departmentId/update')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, data) {
      department = data;
      next();
    });
  })
  .get(function(req, res) {
    res.render('update', {update: department});
  })
  .post(function(req, res) {
    department.dep_name = req.body.dep_name,
    department.abbrv = req.body.abbrv,
    department.head = req.body.head,
    department.website = req.body.website,
    department.contact = req.body.contact,
    department.updatedate = moment().tz("Asia/Manila").format('LLL'),
    department.fb=req.body.fb,
    department.tw=req.body.tw,	
    department.picture=req.body.picture,
    department.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('update', {update: department, error:err})
      } else {
        res.redirect('/departments/'+departmentId);
      }
    });
  })

router.route('/:departmentId/delete')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, c) {
      department = c;
      next();
    });
  })
  .get(function(req, res) {
    department.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/departments');
      }
    });
  });

module.exports = router;
