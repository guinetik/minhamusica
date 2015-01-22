
/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

	
	getHome: function(req, res ){
		
	 var colletion = {}
		
		Banners.find({}).sort('posicao DESC').limit(10).exec(function(err1, b) {
		  if (err1) return res.status(401).send({message:'Erro ao carregar banners'});
		
			colletion.banners = b;
			
			Cd.find({}).sort('createdAt DESC').limit(10).exec(function(err2, c) {
		  		if (err2) return res.status(401).send({message:'Erro ao carregar utilmos uploads'});
			
				colletion.uploads = c;	
				
				Cd.find({}).sort('downloads DESC').limit(10).exec(function(err3, c2) {
		  			if (err3) return res.status(401).send({message:'Erro ao carregar mais baixados'});
		  			
					colletion.mais_baixados = c2;	
					return res.status(200).send({home:colletion});
				});
				
			});	
			
		});
		
	}
	
	
};

