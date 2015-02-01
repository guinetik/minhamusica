/**
 * CdController
 *
 * @description :: Server-side logic for managing cds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var CdController = module.exports = {
    download: function (req, res) {
        var id = req.body.id;
        Cd.findOne({id: id}).exec(function findCB(err, cdFound) {
            if (err) return res.status(404).send({message: 'Erro ao computar download'});
            if (cdFound) {
                var downloadInt = cdFound.downloads + 1;
                console.log("downloads", cdFound.downloads);
                Cd.update({id: id}, {downloads: downloadInt}).exec(function afterwards(err2, up) {
                    console.log("err2", err2);
                    if (err2) return res.status(500).send({message: 'Erro ao computar download'});
                    return res.status(200).send({message: 'Inicializando o download...', downloads: up[0].downloads});
                });
            }
        });
    },
    genero: function (req, res) {
        var genero = req.query.id;
        Cd.find({genero: genero}).populateAll().exec(function (err, cds) {
            if (err) return res.status(404).send({message: 'Erro consultar o gênero'});
            if (cds.length > 0) {
                return res.status(200).send({genero: cds[0].genero.nome, message: "Ok", cds: cds});
            } else {
                Generos.findOne({id: genero}).exec(function (err, gen) {
                    if (err) return res.status(404).send({message: 'Erro consultar o gênero'});
                    return res.status(200).send({genero: gen.nome, message: "Nenhum CD Encontrado", cds: []});
                });
            }
        });
    },
    search: function (req, res) {
        var query = req.query.q;
        Cd.find({meta: {contains: query}}).populateAll().exec(function (err, cds) {
            if (err) return res.status(404).send({message: 'Erro ao fazer a busca'});
            return res.status(200).send({message: "Ok", cds: cds});
        });
    },
    add: function (req, res) {
        var cd = req.body;
        var token = req.headers.token;
        if (!token) {
            res.status(401).send({message: 'Token inválido'});
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
    updateCover: function (req, res) {
        var uploadFile = req.file('file');
        var cd = req.body;
        uploadFile.upload({dirname: '../../public/img'}, function onUploadComplete(err, files) {
            if (err) return res.serverError(err);
            var imagem = files[0].fd.split("/").pop();
            if (cd.id != null) {
                Cd.update({id: cd.id}, {capa: imagem}).exec(function (err, updated) {
                    if (err) return res.status(400).send({message: 'Erro ao atualizar a capa'});
                    return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
                });
            } else {
                return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
            }
        });
    },
};
