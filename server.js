var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

/*Mongoose Connect*/
var db = 'mongodb://localhost/saleslist';
mongoose.connect(db);

var User = require('./models/User');
var Item = require('./models/item');
var	comments = require('./models/comments');

app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send(index.html);
});


//Get New User With Populated items
app.post('/save', function(req, res) {
  //req.body.username = req.body.username.toLowerCase();
  User.findOne({
      'username': req.body.username
    })
    .populate('items')
    .exec(function(err, user) {
      if (err) {
        console.log('error');
        res.send(err);
      } else {
        if (user === null) {
          console.log(req.body);
          var newUser = new User(req.body);
          newUser.save(function(err, newUser) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.send(newUser);
            }
          });
        } else {
          console.log(user);
          res.send(user);
        }

      }
    });
});

app.post('/newItem/:id', function(req, res) {
  var itemsWithUserId = req.body;
  itemsWithUserId._user = req.params.id;

  var newItem = new item(itemWithUserId);
  newItem.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      User.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          'items': doc._id
        }
      },{new:true}, function(err, updatedUser) {
        if (err) {
          console.log(err);
        } else {
          res.send(updatedUser);
        }
      });
    }
  });
});


var port = 3000;
app.listen(port, function() {
  console.log("listening on port:" + port);
});