
var bcrypt  = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    login : function(req ,res , setModel){
		model = Usuarios;
		if (typeof(setModel) !== 'undefined'){
			model = setModel;
		}
		
		var email = req.body.email;
        var password = req.body.senha;
        
        if(!email || !password) {
            return res.status(401).send({
                    message:'email and password required'
            });
        }
		
		model.findOneByEmail(email , function(err ,foundUser){
            if(!foundUser){
                return res.status(401).send({
                    message:'Email or Password invalid'
                });
            }
            
            bcrypt.compare(password , foundUser.senha , function(err ,valid){
                if(err) return res.status(403);
                
                if(!valid){
                    return res.status(401).send({
                            message:'username or password invalid'
                    });
                
                }
				
				
                // ready to send user and jwt 
                createSendToken(foundUser,res);
            }); 
            
        });    
		
	 },
    
	loginAdmin : function(req,res){
    	//this.login(req,res,Admin);
	}
};    