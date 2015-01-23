var createSendToken = require('../services/createSendToken.js');
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  create: function (req, res) {
    var sendUser = req.body;
    Usuarios.create(sendUser).exec(function createCB(err, s) {
      if (err) res.status(301).send({message: 'user not created'});
      createSendToken(s, res);
    });
  },
  lookup: function (req, res) {
    var token = req.body.token;
    if(token == null) if (err) res.status(403).send({message: 'please provide a token'});
    Usuarios.findOneByToken(token, function(result){
      if(result) {
        return res.status(200).send({
          message: 'User found',
          data: result.toJSON()
        });
      } else {
        return res.status(404).send({
          message: 'User not found'
        });
      }
    });
  },
  perfil: function(req,res){
	  
	 var id = req.query.id; 
	  var collection = {};
	  
	  Usuarios.find({id:id}).exec(function findCB(err,usuario){
	  	if(err) return res.status(500).send({message : 'Erro ao buscar usuário.'});
		
		if(usuario.length){
			collection.usuario = usuario;
			
			Cd.find({artista:usuario.id}).sort('createdAt DESC').limit(10).exec(function(err2, c) {
				if(err2) return res.status(500).send({message : 'ultimos cds do usuario.'});
				
				collection.cds = c;
				
				Eventos.find({usuario:usuario.id}).sort('createdAt DESC').limit(10).exec(function(err3, e) {
					if(err3) return res.status(500).send({message : 'ultimos eventos do usuario.'});
					
					collection.eventos = e; 	
					return res.status(200).send({perfil:collection});
				});
			});
		}else
			return res.status(404).send({message:'Usuário não encontrado!'});
		  
	  });
	  
  }	
	
	
};

