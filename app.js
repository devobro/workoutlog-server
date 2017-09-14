require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import('./models/user');
//Create table
// User.sync(); // sync( {force: true}), to drop then create each time the app starts!
sequelize.sync({force: true});

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));
// app.use('/api/test', function(req, res){
// 	res.send("Hello World");
// });

http.listen(process.env.PORT || 3000, function(){
	console.log('App is listening on 3000.')
});


