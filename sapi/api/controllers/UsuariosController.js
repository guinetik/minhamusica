var createSendToken = require('../services/createSendToken.js');
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var UsuariosController = module.exports = {
  create: function (req, res) {
    var sendUser = req.body;
    Usuarios.create(sendUser).exec(function createCB(err, s) {
      if (err) res.status(301).send({message: 'user not created'});
      createSendToken(s, res);
    });
  },
  lookup: function (req, res) {
    var token = req.headers.token;
    if (!token) {
      res.status(403).send({message: 'Token inválido'});
    }
    Usuarios.findOneByToken(token, function (result) {
      if (result) {
        return res.status(200).send({
          message: 'User found',
          data: result.toJSON()
        });
      } else {
        return res.status(404).send({
          message: 'User not found. Token: ' + token
        });
      }
    });
  },
  perfil: function (req, res) {
    var token = req.headers.token;
    var id = req.query.id;
    if (!token && !id) {
      res.status(403).send({message: 'Você deve informar um token válido ou um id de usuario'});
    }
    var collection = {};
    if (id != null) {
      Usuarios.findOne({id: id}).populateAll().exec(function findCB(err, usuario) {
        if (err) return res.status(500).send({message: 'Erro ao buscar usuário.'});
        if (usuario.id) {
          getUserProfile(usuario);
        } else return res.status(404).send({message: 'Usuário não encontrado!'});
      });
    } else {
      if (token != null) {
        Usuarios.findOneByToken(token, function (result) {
          if (result) {
            getUserProfile(result);
          } else return res.status(404).send({message: 'Usuário não encontrado!'});
        });
      }
    }
    function getUserProfile(usuario) {
      collection.usuario = usuario;
      console.log("user.id", usuario.id);
      Cd.find().where({'artista': usuario.id}).sort('createdAt DESC').limit(10).populateAll().exec(function (err2, c) {
        if (err2) return res.status(500).send({message: 'ultimos cds do usuario.'});
        collection.cds = c;
        Eventos.find().where({usuario: usuario.id}).sort('createdAt DESC').limit(10).exec(function (err3, e) {
          if (err3) return res.status(500).send({message: 'ultimos eventos do usuario.'});
          collection.eventos = e;
          return res.status(200).send({perfil: collection});
        });
      });
    }
  },
  collection: function (req, res) {
    var token = req.headers.token;
    if (!token) {
      res.status(403).send({message: 'Token inválido'});
    }
    Usuarios.findOneByToken(token, function (usuario) {
      if (usuario) {
        Cd.find().where({'artista': usuario.id}).populateAll().sort('createdAt DESC').exec(function (err, c) {
          if (err) return res.status(500).send({message: 'Erro ao trazer os cds do usuario.'});
          return res.status(200).send({cds: c, message: 'Cds obtidos com sucesso'});
        });
      } else {
        return res.status(404).send({
          message: 'User not found'
        });
      }
    });
  },
  updateCover: function (req, res) {
    var uploadFile = req.file('file');
    var user = req.body;
    uploadFile.upload({dirname: '../../../frontend/app/public/img'}, function onUploadComplete(err, files) {
      if (err) return res.serverError(err);
      var imagem = files[0].fd.split("/").pop();
      if (user.id != null) {
        Usuarios.update({id: user.id}, {capa: imagem}).exec(function (err, updated) {
          if (err) return res.status(400).send({message: 'Erro ao atualizar a capa'});
          return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
        });
      } else {
        return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
      }
    });
  },
  updateFoto: function (req, res) {
    var uploadFile = req.file('file');
    var user = req.body;
    uploadFile.upload({dirname: '../../../frontend/app/public/img'}, function onUploadComplete(err, files) {
      if (err) return res.serverError(err);
      var imagem = files[0].fd.split("/").pop();
      if (user.id != null) {
        Usuarios.update({id: user.id}, {foto: imagem}).exec(function (err, updated) {
          if (err) return res.status(400).send({message: 'Erro ao atualizar a foto'});
          return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
        });
      } else {
        return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
      }
    });
  }
};

