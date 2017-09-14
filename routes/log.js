var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');

router.post('/', function(req,res){
	//req has some body properties that have a username and pwd
	// console.log(req.body.log.desc)
	// var description = req.body.log.description;
	// var description = req.body.definition.desc;
	var description = req.body.log.desc;
	var calorie = req.body.log.calorie; //added
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;

	//Use our sequelize model to create log
	Log.create({
		description: description,
		calorie: calorie, //added
		result: result,
		owner: user.id,
		def: definition
	}).then(
		function createSuccess(log){
			res.json(log);
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

router.get('/', function(req,res){
	var userid = req.user.id;
	Log.findAll({

		where: {owner: userid}

	}).then(
		function findAllSuccess(data){
		//console.log(data);
			res.json(data);
	},
		function findAllError(err){
			res.send(500, err.message);
		}
	);
});

//This will retrieve one workout specified by the log id
router.get('/:id', function(req,res){
	var data = req.params.id;
	console.log(req.params);
	console.log(data);
	Log.findOne({

		where: { id: data}

	}).then(

		function getSuccess(updateData){
			res.json(updateData);
		},

		function getError(err){
			res.send(500, err.message);
		}
	);
});

//this will return the data from the log that was updated
router.put('/', function(req,res){
	var description = req.body.log.description;
	var calorie = req.body.log.calorie;//added
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def;
	// console.log(req);
	Log.update({
		description: description,
		calorie: calorie,//added
		result: result,
		def: definition
	},

	{where: {id: data}}

	).then(
	
		function updateSuccess(updatedLog){
			res.json(updatedLog);
		},

		function updateError(err){
			res.send(500, err.message);
		}
	)
});

router.delete('/', function(req,res){
	var data = req.body.log.id;
	Log.destroy({
		where: { id: data}

	}).then(
		function deleteLogSuccess(data){
			res.send("you removed a log");
		},
		function deleteLogError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;