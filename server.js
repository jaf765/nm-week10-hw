var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});


var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.get('/display', function(req, res) {
  db.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else {
      console.log(saved);
      res.send(saved);
  	}
  });
});


var alldatas = [];
app.post('/submit', function (req, res) {

  var data = {
    plant: req.body.plant,
    scientificName: req.body.scientificName,
  };

  console.log(data.faceloc);

  //alldatas.push(data);
  db.insert(data, function (err, newDocs) {
	   console.log("err: " + err);
	    console.log("newDocs: " + newDocs);
  });

  res.redirect("/display");
});

app.get("/individual", function(req, res) {
  var id = req.query.id;
  db.find({_id: id}, function(err, docs) {
    console.log(docs);
    // Should go to an EJS
    res.send(docs);
  });
});

app.get('/display', function(req, res) {

      var datatopass = {data:docs};
      res.render("display.ejs",datatopass);
    });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});
