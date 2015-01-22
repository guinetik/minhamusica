/**
 * GenerosController
 *
 * @description :: Server-side logic for managing generos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getGeneros : function(req,res){
		Generos.find({}).exec(function(err,g){
			if(err) return res.status(500).send({message: 'Erro ao consultar genero'})
			return res.status(200).send({generos:g.toJSON}); 
		})
	} 
	
	
};

