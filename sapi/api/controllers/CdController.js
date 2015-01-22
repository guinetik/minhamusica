/**
 * CdController
 *
 * @description :: Server-side logic for managing cds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	
	
	downloadCount : function(req,res){
	  	var params = req.url.split('/');
		var param = params.pop();
		var id = param.replace('?id=', '');
		
		Cd.find({id:id}).exec(function findCB(err ,cdFound){
			if(err) return res.status(404).send({message:'Erro ao computar download'})
			
			if(cdFound){
				var downloadInt = cdFound.downloads + 1;
				Cd.update({id:id},{downloads:downloadInt}).exec(function afterwards(err2, up){
					if(err2) return res.status(404).send({message:'Erro ao computar download'})
					
					return res.status(200).send({message:'Sucesso ao computar download'})
				});	
			}
		});
		
	}
	
	
};

