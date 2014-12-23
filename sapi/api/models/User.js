var bcrypt = require('bcrypt-nodejs');


module.exports = {

	
	tableName : 'user' , 
	
	schema: true , 
	
    attributes: {
        nome : {
            type: 'string' , 
			require : true ,
			maxLength : 30	
		},
		email: { 
            type:'string', 
            require : true,
            unique : true ,
			maxLength : 30	
        },
        senha: {
            type: 'string' ,
            require: true
        },
		nascimento : {
			type: 'date' , 
			require: true 
		},
		sexo : {
			type : 'string' , 
			require: true
		},
		cidadeId : {
			type: 'integer' ,
			require : true 
		},
		estadoId : {
			type: 'integer' ,
			require : true 
		},
		tipoId : {
			type: 'integer' ,
			require : true 
			
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
    beforeCreate: function(value,next){
        var pass  = values.senha;
        
		bcrypt.hash(pass , 'salt' , null , function(err,hash){
			if(err){ 
				next(err);
			}
			values.senha = hash;
		
		});
		
		
        next();
    }

};

