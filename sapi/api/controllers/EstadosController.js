/**
 * EstadoController
 *
 * @description :: Server-side logic for managing estadoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	getEstados: function(req,res){
		Estados.find({}).populate('cidades').exec(function findCB(err , s){
			if(err) return res.status(301).send({message:'erro'});
			return res.status(200).send(s);
		});
	},
	
	
};

