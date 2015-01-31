/**
 * BannersController
 *
 * @description :: Server-side logic for managing banners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var gm = require('gm');
var fs = require('fs');

var BannersController = module.exports = {
  proportions: {
    'banner': {
      'width': 1000,
      'height': 368
    },
    'thumb': {
      'width': 131,
      'height': 42
    }
  },
  msgError: '',
  list: function (req, res) {
    Banners.find({}).sort('posicao DESC').limit(100).exec(function (err, banners) {
      if (err) return serverError(err);
      res.view('banner/index', {
        banners: banners,
        error: module.exports.msgError
      });
      module.exports.msgError = '';
    });
  },
  changePosition: function (req, res) {
    var newData = req.body.data;
    var newPositions = newData.split(',');
    _.each(newPositions, function (pos) {
      var pIds = pos.split('-');
      Banners.update({
        id: pIds[0]
      }, {
        posicao: pIds[1]
      }).exec(function afterwards(err, u) {
        if (err) {
          return res.status(200).send({
            message: "erro"
          });
        } else {
          return res.status(200).send({
            message: "sucesso"
          });
        }
      });
    });
  },
  // @TODO:redimensionar imagem , cadastrar como destaque , editar , excluir
  createBanner: function (req, res, next) {
    var banner = req.body;
    var cod = banner.cod;

    var dir = function () {
      var path = __dirname.split('\\');
      path.pop();
      path.pop();
      return path.join('\\');
    }
    var pathDir = '../../public/img';
    var pathDirThumb = '../../public/img';


    var supportedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/png'
    ];

    var proportions = module.exports.proportions;

    req.file('img').upload({
      dirname: pathDir
    }, function onUploadComplete(err, file) {
      if (err) {
        module.exports.msgError = 'Erro no upload da imagem.';
        module.exports.list(req, res);
        return false;
      }

      banner.cod = cod;
      var checkType = supportedTypes.filter(function (type) {
        return type === file[0].type;
      });

      if (checkType.length) {
        var nameImg = function () {
          var Arr = file[0].fd.split('\\')
          return Arr[Arr.length - 1];
        };

        banner.src = nameImg();
        gm(file[0].fd).size(function (err, img) {
          if (!err) {

            if (proportions.banner.width <= img.width && proportions.banner.height <= img.height) {
              var pX = proportions.banner.width * img.height;
              var pY = proportions.banner.height * img.width;
              var isProportional = (pX === pY);

              if (isProportional) {
                gm(file[0].fd)
                  .resize(proportions.banner.width, proportions.banner.height)
                  .write(pathDir + banner.src, function (err) {
                    if (err) {
                      fs.unlinkSync(file[0].fd);
                      module.exports.msgError = 'Erro ao redimensionar imagem.';
                      module.exports.list(req, res);
                    } else {
                      gm(pathDir + banner.src)
                        .resize(proportions.thumb.width, proportions.thumb.height)
                        .write(pathDirThumb + banner.src, function (err2) {
                          if (err2) {
                            fs.unlinkSync(file[0].fd);
                            module.exports.msgError = 'Erro ao criar thumb de imagem.';
                            module.exports.list(req, res);
                          } else {
                            module.exports.saveBanner(res, banner);
                          }
                        });
                    }
                  });

              } else {
                // abrir crop de imagem
                res.view('banner/crop', {
                  banner: banner,
                  img: '../../public/img/' + banner.src,
                  proportions: proportions
                });
              }
            } else {
              var msgError = 'Imagem com proporções menores que o padrão (largura =' + proportions.banner.width + 'px';
              msgError += ' e altura =' + proportions.banner.height + 'px).';
              fs.unlinkSync(file[0].fd);
              module.exports.msgError = msgError;
              module.exports.list(req, res);
            }

          }
        });

      } else {
        fs.unlinkSync(file[0].fd);
        module.exports.msgError = 'Tipo de imagem inadequado, tipos suportados são: JPEG, JPG, GIF e PNG.';
        module.exports.list(req, res);
      }
    });
  },

  cropBanner: function (req, res) {
    var dir = function () {
      var path = __dirname.split('\\');
      path.pop();
      path.pop();
      return path.join('\\');
    }
    var pathTmpDir = dir() + '\\.tmp\\public\\images\\destaques\\';
    var pathDir = dir() + '\\assets\\images\\destaques\\';
    var pathDirThumb = dir() + '\\assets\\images\\destaques\\thumb\\';


    var proportions = module.exports.proportions;
    var ban = req.body;

    gm(pathTmpDir + ban.src)
      .crop(proportions.banner.width,
      proportions.banner.height,
      ban.deltaX,
      ban.deltaY)
      .write(pathDir + ban.src, function (err) {
        if (!err) {
          gm(pathDir + ban.src)
            .resize(proportions.thumb.width, proportions.thumb.height)
            .write(pathDirThumb + ban.src, function (err2) {
              if (!err2) {
                module.exports.saveBanner(res, ban);
              } else {
                fs.unlinkSync(pathDir + banner.src);
                console.log(err2);
              }
            });
        } else {
          fs.unlinkSync(pathTmpDir + banner.src);
          module.exports.msgError = 'Erro ao carregar tamanho de imagem.';
          module.exports.list(req, res);
        }

      });

  },
  saveBanner: function (res, banner) {
    Banners.create(banner).exec(function createCB(err, b) {
      if (err) return res.serverError(err);
      res.redirect('/');
    });
  },
  deleteBanner: function (req, res) {
    var params = req.url.split('/');
    var param = params.pop();
    var id = param.replace('?id=', '');
    Banners.destroy({
      id: id
    }).exec(function (err, users) {
      if (err) return res.serverError(err);
      res.redirect('/');
    });
  }
};
