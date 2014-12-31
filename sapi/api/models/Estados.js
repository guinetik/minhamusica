/**
* Estado.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true , 
  tableName: 'estados',
	  
  attributes: {
	  nome: {
	  	type: 'String' ,
	  	maxLength : 100,
	  }, 
	  sigla:{
		 type: 'String' ,
	  	 maxLength : 3,
		 unique: true
	  },
	  cidades:{
  		collection : 'Cidades',
		via: 'estado'
  	  }
  }
	
};

