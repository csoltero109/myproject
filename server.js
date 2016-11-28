var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('myproject', ['myproject']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/myproject', function (req, res) {
  console.log('I received a GET request');

  db.myproject.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/myproject', function (req, res) {
  console.log(req.body);
  db.myproject.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/myproject/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.myproject.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/myproject/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.myproject.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/myproject/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.myproject.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8080);
console.log("Server running on port 3000");