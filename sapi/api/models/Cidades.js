/**
* Cidade.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true , 
	tableName : 'cidades' , 
	autoPK: false,
  attributes: {
	  id:{
		type : 'Integer' ,  
	  	primaryKey: true, 
		unique : true 
	  },
	  
	  nome:{
	  	type :'String',
		maxLength : 100
	  },
	  
	  estado: {
	  	 model: 'Estados'
	  }
}
};

