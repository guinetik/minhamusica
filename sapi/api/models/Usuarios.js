var bcrypt = require('bcrypt-nodejs');
	

module.exports = {

	tableName : 'usuarios' , 
	schema: true , 
	
    attributes: {
        nome : {
            type: 'string' , 
			required : true ,
			maxLength : 200	
		},
		email: { 
            type:'string', 
          	required : true,
            //unique : true ,
			maxLength : 100	
        },
        senha: {
            type: 'string' ,
            required: true
        },
		sexo: {
			type : 'string' , 
			required: true ,
			maxLength : 1
		},
		nascimento: {
			type: 'date' , 
			required: true 
		},
		cidade: {
			model:'cidades'
		},
		tipo: {
			model : 'tipos' 
		},
		twitter: {
			type: 'string' , 
			maxLength : 100	
		},
		instagram: {
			type: 'string', 
			maxLength : 100 
		},
		facebookId: {
			type: 'string' 
		}
	 },
		 
 /**
   * Lifecycle Callbacks
   *
   * Run before and after various stages:
   *
   * beforeValidate
   * afterValidate
   * beforeUpdate
   * afterUpdate
   * beforeCreate
   * afterCreate
   * beforeDestroy
   * afterDestroy
   */ 
 /*   beforeCreate: function(value,next){
        var pass  = values.senha;
        
		bcrypt.hash(pass , 'salt' , null , function(err,hash){
			if(err){ 
				next(err);
			}
			values.senha = hash;
		
		});
		
		
        next();
    }*/

};

