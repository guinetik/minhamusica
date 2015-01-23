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
    if (!cd.token) {
      res.status(403).send({message: 'Token inválido'})
    }
    Usuarios.findOneByToken(cd.token, function (result) {
      if (!result) {
        res.status(404).send({message: 'Artista não encontrado'})
      }
      delete cd.token;
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
  addMusic: function (req, res) {
    var uploadFile = req.file('file');
    if (!req.body.id_cd) {
      return res.status(404).send({message: 'Erro ao salvar a música. Cd não encontrado'});
    }
    Cd.findOneById(req.body.id_cd, function (err, cd) {
      if (err) return res.status(404).send({message: 'Erro ao salvar a música. Cd não encontrado'});
      uploadFile.upload({dirname: '../../assets/music'}, function onUploadComplete(err, files) {
        if (err) return res.serverError(err);
        var song = {
          nome: files[0].filename,
          url: files[0].fd,
          cd: cd
        };
        Musica.create(song).exec(function createCB(err, musica) {
          if (err) {
            if (err) return res.status(404).send({message: 'Erro ao salvar a musica'});
            console.log(err);
          }
          return res.status(200).send({message: 'Música Salva com sucesso', musica: musica});
        });
      });
    });
  }
};

