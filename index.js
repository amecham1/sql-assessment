var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://name:strongpassword@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
     app.set('db', db);
     db.user_create_seed(function(){
       console.log("User Table Init");
     });
     db.vehicle_create_seed(function(){
       console.log("Vehicle Table Init");
     });
});

app.get('/api/users', function(req,res,next){
  db.get_all_users(function(err,users){
    if(err){
      res.send(err);
    } else{
      res.send(users);
    }
  });
});

app.get('/api/vehicles', function(req, res, next){
	db.get_all_vehicles(function(err, vehicles){
		if (err){
			res.send(err);
		} else {
			res.send(vehicles);
		}
	});
});

app.post('/api/users', function(req, res, next){
	db.add_a_user([req.body.firstname, req.body.lastname, req.body.email], function(err, newUser){
		if (err){
			res.send(err);
		} else {
			res.send(newUser);
		}
	});
});

app.post('/api/vehicles', function(req, res, next){
	db.add_a_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/api/user/:userId/vehiclecount', function(req, res, next){
	db.how_many_vehicles([Number(req.params.userId)], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result[0]);
		}
	});
});

app.get('/api/user/:userId/vehicle', function(req, res, next){
	db.get_user_vehicles([Number(req.params.userId)], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/api/vehicle', function(req, res, next){
	if (req.query.UserEmail){
		db.get_vehicles_by_email([req.query.UserEmail], function(err, result){
			if (err){
				res.send(err);
			} else {
				res.send(result);
			}
		});
	}
	if (req.query.userFirstStart){
		db.get_vehicles_by_firstname([req.query.userFirstStart], function(err, result){
			if (err){
				res.send(err);
			} else {
				res.send(result);
			}
	});
	}
});

app.get('/api/newervehiclesbyyear', function(req, res, next){
	db.get_vehicles_by_year(function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});


app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next){
	db.update_vehicle_owner([req.params.vehicleId, req.params.userId], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});


app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next){
	db.remove_vehicle_owner([Number(req.params.vehicleId), Number(req.params.userId)], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});


app.delete('/api/vehicle/:vehicleId', function(req, res, next){
	db.delete_vehicle([req.params.vehicleId], function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send(result);
		}
	});
});








app.listen('3000', function(){
  console.log("Successfully listening on : 3000");
});

module.exports = app;
