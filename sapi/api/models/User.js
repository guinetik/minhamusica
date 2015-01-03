var bcrypt = require('bcrypt-nodejs');
	

module.exports = {

	tableName : 'user' , 
	schema: true , 
	
    attributes: {
        nome : {
            type: 'string' , 
			require : true ,
			maxLength : 200	
		},
		email: { 
            type:'string', 
            require : true,
            unique : true ,
			maxLength : 100	
        },
        senha: {
            type: 'string' ,
            require: true
        },
		sexo : {
			type : 'string' , 
			require: true ,
			maxLength : 1
		},
		nascimento : {
			type: 'date' , 
			require: true 
		},
		cidadeId : {
			model:'cidades'
		},
		estadoId : {
			model:'estados'
		},
		/*tipoId : {
			type: 'integer' ,
			require : true 
			
		}*/
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

