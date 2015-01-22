var bcrypt = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function (req, res) {
    var email = req.body.email;
    var password = req.body.senha;
    if (!email || !password) {
      return res.status(401).send({
        message: 'email and password required'
      });
    }
    Usuarios.findOneByEmail(email).populate("cidade").exec(function (err, foundUser) {
      if (!foundUser) {
        return res.status(401).send({
          message: 'Email or Password invalid'
        });
      }
      bcrypt.compare(password, foundUser.senha, function (err, valid) {
        if (err) return res.status(403);
        if (!valid) {
          return res.status(401).send({
            message: 'username or password invalid'
          });
        }
        // ready to send user and jwt
        createSendToken(foundUser.toJSON(), res);
      });
    });
  },
  loginAdmin: function (req, res) {
    res.locals.layout = 'loginLayout';
	if (req.method == 'POST') {
      var email = req.body.email;
      var password = req.body.senha;

      if (!email || !password) {
        return res.view('login', {error: 'Email e Senha são requeridos!'});
      }

      Admin.findOneByEmail(email, function (err, foundUser) {
        if (!foundUser) {
          return res.view('login', {error: 'Email e Senha inválidos!'});
        }

        bcrypt.compare(password, foundUser.senha, function (err, valid) {
          if (err) return res.view('login', {error: 'Ops! ocorreu um erro, por favor tente novamente.'});

          if (!valid) {
            return res.view('login', {error: 'Email e Senha inválidos!'});
          }

          req.session.authenticated = foundUser;
				return res.redirect('/');
        });

      });
    } else {
      return res.view('login', {error: false, telaLogin: true});
    }

  },
  logoutAdmin: function (req, res) {
    delete req.session.authenticated;
    res.redirect('/');
  }
};
