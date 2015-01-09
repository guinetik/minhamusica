/**
* Banners.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

 
	tableName : 'banners' , 
	schema: true , 
	
    attributes: {
        titulo : {
            type: 'string' , 
			required : true ,
			maxLength : 200	
		},
		url: { 
            type:'string', 
        },
		img: { 
            type:'string', 
          	required : true,
        },
		
	 },
		
  
};

