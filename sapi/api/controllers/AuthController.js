
var bcrypt  = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    login : function(req ,res){
		
		var email = req.body.email;
        var password = req.body.senha;
        
        if(!email || !password) {
            return res.status(401).send({
                    message:'email and password required'
            });
        }
		
		Usuarios.findOneByEmail(email , function(err ,foundUser){
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
    
    register : function(req,res){
    
        var email = req.body.email;
        var password =  req.body.password;
        
        if(!email || !password){ 
            return res.status(401).send({
                message: 'Email and Password required'
            });
       }
        
        User.create({
            email:email,
            password:password
        }).exec(function(err,user){
            if(err) return res.status(403).send({
                message:'User not created'
            });
        
            createSendToken(user,res);
        
        });
        
    }
};    