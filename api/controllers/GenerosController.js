/**
 * GenerosController
 *
 * @description :: Server-side logic for managing generos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GenerosController = module.exports = {
  msgError: '',
  getGeneros: function (req, res) {
    Generos.find({}).exec(function (err, g) {
      if (err) return res.status(500).send({message: 'Erro ao consultar genero'})
      return res.status(200).send({generos: g});
    })
  },
  list: function (req, res, next) {
    Generos.find({}).limit(10).exec(function (err, generos) {
      if (err) return next(err);
      res.view('genero/index', {
        generos: generos,
        error: module.exports.msgError
      });
      module.exports.msgError = ''
    })
  },
  updateGenero: function (req, res) {
    var admin = req.body;
    Generos.update({
      id: admin.id
    }, admin).exec(function afterwards(err, upb) {
      if (err) {
        module.exports.msgError = 'Erro ao atualizar gênero, por favor tente novamente.';
        console.log(err);
      }
      console.log(upb);
      res.redirect('/genero/listar/');
    });
  },
  createGenero: function (req, res) {
    var genero = req.body;
    Generos.create(genero).exec(function createCB(err, b) {
      if (err) {
        module.exports.msgError = 'Erro ao criar gênero, por favor tente novamente.';
        console.log(err);
      }
      res.redirect('/genero/listar/');
    });
  },
  deleteGenero: function (req, res) {
    var params = req.url.split('/');
    var param = params.pop();
    var id = param.replace('?id=', '');
    Generos.destroy({
      id: id
    }).exec(function (err, generos) {
      if (err) module.exports.msgError = 'Erro ao deletar gênero, por favor tente novamente.';
      res.redirect('/genero/listar/');
    });
  }
};
