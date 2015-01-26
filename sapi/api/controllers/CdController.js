/**
 * CdController
 *
 * @description :: Server-side logic for managing cds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  downloadCount: function (req, res) {
    var params = req.url.split('/');
    var param = params.pop();
    var id = param.replace('?id=', '');
    Cd.find({id: id}).exec(function findCB(err, cdFound) {
      if (err) return res.status(404).send({message: 'Erro ao computar download'})
      if (cdFound) {
        var downloadInt = cdFound.downloads + 1;
        Cd.update({id: id}, {downloads: downloadInt}).exec(function afterwards(err2, up) {
          if (err2) return res.status(404).send({message: 'Erro ao computar download'})

          return res.status(200).send({message: 'Sucesso ao computar download'});
        });
      }
    });
  },
  add: function (req, res) {
    var cd = req.body;
    var token = req.headers.token;
    if (!token) {
      res.status(403).send({message: 'Token inválido'});
    }
    Usuarios.findOneByToken(token, function (result) {
      if (!result) {
        res.status(404).send({message: 'Artista não encontrado'})
      }
      cd.artista = result;
      Cd.create(cd).exec(function createCB(err, cd) {
        if (err) {
          if (err) return res.status(404).send({message: 'Erro ao salvar o cd'});
          console.log(err);
        }
        return res.status(200).send({message: 'Cd criado com sucesso', cd: cd});
      });
    });
  },
  updateCover:function(req, res) {
    var uploadFile = req.file('file');
    var cd = req.body;
    uploadFile.upload({dirname: '../../assets/images/cover'}, function onUploadComplete(err, files) {
      if (err) return res.serverError(err);
      var imagem = files[0].fd.split("/").pop();
      if(cd.id != null) {
        Cd.update({id:cd.id}, {capa:capa}).exec(function(err, updated){
          if(err) return res.status(400).send({message: 'Erro ao atualizar a capa'});
          return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
        });
      } else {
        return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
      }
    });
  }
};

