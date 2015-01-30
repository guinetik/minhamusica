/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var AdminController = module.exports = {
  msgError: '',
  list: function (req, res, next) {
    Admin.find({}).limit(10).exec(function (err, users) {
      if (err) return next(err);
      res.view('admin/index', {
        users: users,
        error: module.exports.msgError
      });
      module.exports.msgError = ''
    })
  },
  updateAdmin: function (req, res) {
    var admin = req.body;

    Admin.update({
      id: admin.id
    }, admin).exec(function afterwards(err, upb) {
      if (err) {
        module.exports.msgError = 'Erro ao atualizar usuário, por favor tente novamente.';
        console.log(err);
      }
      console.log(upb);
      res.redirect('/admin/listar/');
    });
  },
  createAdmin: function (req, res) {
    var admin = req.body;

    Admin.create(admin).exec(function createCB(err, b) {
      if (err) {
        module.exports.msgError = 'Erro ao criar usuário, por favor tente novamente.';
        console.log(err);
      }
      res.redirect('/admin/listar/');
    });

  },
  deleteAdmin: function (req, res) {

    var params = req.url.split('/');
    var param = params.pop();
    var id = param.replace('?id=', '');

    Admin.destroy({
      id: id
    }).exec(function (err, users) {
      if (err) module.exports.msgError = 'Erro ao deletar usuário, por favor tente novamente.';
      res.redirect('/admin/listar/');
    });
  }

};
