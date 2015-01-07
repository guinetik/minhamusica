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
	
	 beforeCreate: function(attr,next){
      	bcrypt.genSalt(10 ,function(err,salt){
			if(err){ 
				next(err);
			}
			
			bcrypt.hash(attr.senha,salt,null,function(err,hash){
			
				if(err) return next(err);
				
				attr.senha = hash;
				next();
			
			});
		
		});
	}
		 
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
 /*  */

};

