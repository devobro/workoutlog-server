var Sequelize = require('sequelize');

// Comment this to run on heroku
// var sequelize = new Sequelize ('workoutlog', 'postgres', 'PostgreSQLbrontosaurus1978!', {
// 	host: 'localhost',
// 	dialect: 'postgres'
// });

// Comment this to run locally
var sequelize = new Sequelize (process.env.DATABASE_URL || 'postgres://postgres:PostgreSQLbrontosaurus1978!@localhost:5432/workoutlog',{
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);
var User = sequelize.import('./models/user');

module.exports = sequelize;