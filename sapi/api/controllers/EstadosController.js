/**
 * EstadoController
 *
 * @description :: Server-side logic for managing estadoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	
	criarEstados: function(req,res){
		
		var arrEstados = req.body;
	
		arrEstados.forEach(function(item){
			Estados.create(item).exec(function createCB(err,s){
				if(err) return res.status(301).send({message:'erro estado'});
			});
		});	
		return res.status(200).send({message:'OK'});
		
	},
	
	
	getEstados: function(req,res){
		Estados.find({}).exec(function findCB(err , s){
			if(err) return res.status(301).send({message:'erro'});
			return res.status(200).send(s);
		});
	},
	
	getCidades: function(req, res){
		var estado = req.body;	
		Cidades.find({estadoId : estado.id}).exec(function findCB(err,cidades){
			if(err) return res.status(301).send({message:'erro'});
			return res.status(200).send(cidades);
		});
	}
	
	
};

