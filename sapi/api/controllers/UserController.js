

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function (req, res){
			
		var sendUser = req.body;
		var newUser = {
			nome: sendUser.nome,
			email: sendUser.email,
			senha:sendUser.senha,
			sexo:sendUser.sexo	
		}
		User.create(newUser).exec(function createCB(err,s){	
			if(err) res.status(301).send({message:'user not created'});
			res.status(200).json(s);
		});
		
	
	}
	
};	

