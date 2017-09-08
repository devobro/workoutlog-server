//nature of http is stateless, so once the req,res operation is complete, then there is no longer a state
//it is an identification protocol which provides the client with a passport (header, token, etc.)

module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*');
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
	res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
};