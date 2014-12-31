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
			   
				/* var arrCidades = [] ;
				 var arrCidades = item.cidades;
				
				arrCidades.forEach(function(city){
					
					Cidades.create(city).exec(function createCB(errc,c){
						if(errc) return res.status(301).send({message:'erro cidade'});
						console.log(c.id); 
					});
				
				});*/
			});
		});	
		
		
		return res.status(200).send({message:'OK'});
		
	}
	
	
};

