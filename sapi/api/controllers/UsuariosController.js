var createSendToken = require('../services/createSendToken.js');
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  create: function (req, res) {
    var sendUser = req.body;
    Usuarios.create(sendUser).exec(function createCB(err, s) {
      if (err) res.status(301).send({message: 'user not created'});
      createSendToken(s, res);
    });
  },
  lookup: function (req, res) {
    var token = req.body.token;
    if(token == null) if (err) res.status(403).send({message: 'please provide a token'});
    Usuarios.findOneByToken(token, function(result){
      if(result) {
        return res.status(200).send({
          message: 'User found',
          data: result.toJSON()
        });
      } else {
        return res.status(404).send({
          message: 'User not found'
        });
      }
    });
  }
};

