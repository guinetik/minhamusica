var createSendToken = require('../services/createSendToken.js');
var jwt = require('jwt-simple');
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
    var palyload = jwt.decode(token, 'shhh..');
    Usuarios.findOneById(palyload.sub).populate("cidade").exec(function (err, foundUser) {
      if (!foundUser) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
      console.log(foundUser.prototype);
      return res.status(200).send({
        message: 'User found',
        data: foundUser.toJSON()
      });
    });
  }
};

