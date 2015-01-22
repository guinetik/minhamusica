/**
 * CdController
 *
 * @description :: Server-side logic for managing cds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	
	
	createDownload : function(req, res){
		var params = req.body; 
		
		Cd.find({id:params.cd}).exec(function findCB(err,foundCd){
			if(err) return res.status(404).send({message:'Cd não encontrado!'});
			Download.create({usuario: params.usuario,cd: params.cd}).exec(function createCB(err2 , d){
				if(err) return res.status(500).send({message:'Erro ao computar download'});
				return res.status(200).send({message : 'download computado com successo'});
			});
			
		});
		
	}
	
	
};

