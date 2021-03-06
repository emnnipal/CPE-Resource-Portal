var express = require('express');
var router = express.Router();
var Subject = require('../models/subjects');
var Item = require('../models/item');
var moment = require('moment-timezone');
var User = require('../models/user');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }else if (req.user.acctype!=='admin') {
    res.redirect('/portal')
  }
  next();
});

router.post('/addnew', function(req, res) {
    new Subject({
      name: req.body.name,
	    code: req.body.code,
	    year: req.body.year,
      sem: req.body.sem,
	    createdate: moment().tz("Asia/Manila").format('LLL'),
    }).save(function(err, data, count) {
      if(err) {
        console.log(err)
        res.render('addnew', {error:err})
      } else {
        res.redirect('/portal')
      }
    })
});

router.get('/addnew', function(req, res) {
  res.render('addnew', {data: {}});
});
	
router.get('/edit/users', function(req, res) {
  User.find( function(err, data, count) {
    res.render('users', {users: data});
  })
});



router.route('/edit/users/delete/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    User.findById(userId, function(err, c) {
      user = c;
      next();    
    });
  })
  .get(function(req, res) {
    user.remove((err,item)=>{
            if(err){
                console.log(err);
            }else{
              console.log('delete user success')
              res.redirect('/subjects/edit/users')
            }
        });
  });

router.route('/edit/users/modify/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    User.findById(userId, function(err, data) {
      user = data;
      next();
    });
  })
  .get(function(req, res) {
    res.render('editusers', {update: user});
  })
  .post(function(req, res) {
    user.username = req.body.username,
    user.first_name = req.body.first_name,
    user.last_name = req.body.last_name,
    user.email = req.body.email,
    // user.acctype = req.body.acctype,
    user.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('update', {error:err})
      } else {
        res.redirect('/subjects/edit/users');
      }
    });
  })

router.route('/promote/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    User.findById(userId, function(err, data) {
      user = data;
      next();
    });
  })
  .get(function(req, res) {
    user.acctype = 'admin',
    user.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('users', {error:err})
      } else {
        res.redirect('/subjects/edit/users');
      }
    });
  })

router.route('/demote/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    User.findById(userId, function(err, data) {
      user = data;
      next();
    });
  })
  .get(function(req, res) {
    user.acctype = 'student',
    user.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('users', {error:err})
      } else {
        res.redirect('/subjects/edit/users');
      }
    });
  })



router.route('/:subjectId/update')
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
        items = data;
      }
      if(data)
      {next();}
      });
      
    });
  })
  .get(function(req, res) {
    res.render('update', {update: subject,items:items, moment:moment});
  })
  .post(function(req, res) {
    subject.name = req.body.name,
    subject.code = req.body.code,
    subject.year = req.body.year,
    subject.sem = req.body.sem,
    subject.updatedate = moment().tz("Asia/Manila").format('LLL'),
    subject.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('update', {update: subject, error:err})
      } else {
        res.redirect('/portal/'+subjectId);
      }
    });
  })

router.get('/approval', function(req, res) {
  Item.find( function(err, data, count) {
    res.render('approval', {items: data, user:req.user, moment:moment});
  })
});

router.route('/approval/:itemId')
  .all(function(req, res, next) {
    itemId = req.params.itemId;
    item = {};
    Item.findById(itemId, function(err, data) {
      item = data;
      next();
    });
  })
  .get(function(req, res) {
    item.approval = 'approved',
    item.save(function(err, data, count) {
      if(err) {
        console.log(err)
        res.render('approval', {update: item, error:err})
      } else {
        res.redirect('/subjects/approval');
      }
    });
  })

router.route('/approval/:itemId/decline')
  .all(function(req, res, next) {
    itemId = req.params.itemId;
    item = {};
    Item.findById(itemId, function(err, data) {
      item = data;
      next();
    });
  })
  .get(function(req, res) {
    item.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/subjects/approval');
      }
    });
  });
  
  

router.route('/:subjectId/delete')
  .all(function(req, res, next) {
    subjectId = req.params.subjectId;
    subject = {};
    Subject.findById(subjectId, function(err, c) {
      subject = c;
      next();
    });
  })
  .get(function(req, res) {
    subject.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/portal');
      }
    });
  });

router.route('/delete/:subjectId/:id')
  .all(function(req, res, next) {
    subjectId = req.params.subjectId;
    subject = {};
    Subject.findById(subjectId, function(err, c) {
      subject = c;
      
      Item.findById(req.params.id,(err,items)=>{
        if(err){
           console.log(err);
        }else{
          item = items;
        }
        if(items)
      {next();}
    });
    
    });
  })
  .get(function(req, res) {
    item.remove((err,item)=>{
            if(err){
                console.log(err);
            }else{
              console.log('delete success')
              res.redirect('/subjects/'+subjectId+'/update')
            }
        });
  });


module.exports = router;
