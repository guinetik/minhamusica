var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(user,res){

	var payload ={
        sub : user.id,
        exp : moment().add(10, 'days').unix()
    }

	var token = jwt.encode(payload,'shhh..');

  console.log("createSendToken", user, token);

    res.status(200).send({
        user: user.toJSON(),
        message: "Bem vindo, " + user.nome,
        token: token
    })

}
