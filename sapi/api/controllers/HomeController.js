
/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

	
	getHome: function(req, res ){
		
		//.limit(10)
		
		Download
		.find({})
		.groupBy('cd')
		.sum('1')
		.exec(function findCB(err, b) {
		  if (err) return res.status(401).send({message:'Erro ao carregar dowloads'});
		  console.log(b);
		  //return res.status(200).send({banners:b});
		});
		
		/*Banners.find({}).sort('posicao DESC').limit(10).exec(function(err, b) {
		  if (err) return res.status(401).send({message:'Erro ao carregar banners'});
		  return res.status(200).send({banners:b});
		});
		
		Cd.find({}).sort('createdAt DESC').limit(10).exec(function(err, b) {
		  if (err) return res.status(401).send({message:'Erro ao carregar banners'});
		  return res.status(200).send({banners:b});
		});*/
	}
	
	
};

