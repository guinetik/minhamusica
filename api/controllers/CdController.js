/**
 * CdController
 *
 * @description :: Server-side logic for managing cds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var ZipCd = require("../services/zipCd.js");
var updateCdMeta = require('../services/updateCdMeta.js');
var CdController = module.exports = {
    download: function (req, res) {
        var id = req.body.id;
        if (id == null) return res.status(400).send({message: 'Parametros inválidos'});
        Cd.findOne({id: id}).exec(function findCB(err, cdFound) {
            if (err) return res.status(400).send({message: 'Erro ao computar download'});
            if (cdFound) {
                var downloadInt = cdFound.downloads + 1;
                Cd.update({id: id}, {downloads: downloadInt}).exec(function afterwards(err2, up) {
                    if (err2) return res.status(500).send({message: 'Erro ao computar download'});
                    return res.status(200).send({
                        message: 'Inicializando o download...',
                        downloads: up[0].downloads,
                        url: '/public/downloads/' + id + '.zip'
                    });
                });
            }
        });
    },
    get: function (req, res) {
        var id = req.query.id;
        if (id == NaN) return res.status(400).send({message: 'Parametros inválidos'});
        Cd.findOne({id: id}).populateAll().exec(function (err, cd) {
            if (err) return res.status(400).send({message: 'Erro consultar o cd'});
            try {
                if (cd.artista!=null) {
                    Eventos.find({usuario: cd.artista.id}).sort('createdAt DESC').limit(2).populateAll().exec(function (err, eventos) {
                        if (err) return res.status(400).send({message: 'Erro ao carregar eventos'});
                        Cd.find({genero: cd.genero.id}).populateAll().limit(2).exec(function (err, related) {
                            if (err) return res.status(400).send({message: 'Erro ao carregar cds relacionados'});
                            return res.status(200).send({message: "Ok", cd: cd, eventos: eventos, related: related});
                        });
                    });
                } else {
                    return res.status(400).send({message: 'Erro consultar o cd'});
                }
            } catch(error) {
                console.log("CdController get", error);
                return res.status(400).send({message: 'Erro consultar o cd'});
            }
        });
    },
    save: function (req, res) {
        var id = req.body.id_cd;
        if (id == null) return res.status(400).send({message: 'Parametros inválidos'});
        updateCdMeta(id, function () {
            ZipCd(id, function (result) {
                if (result) {
                    return res.status(200).send({message: "Cd Salvo com sucesso"});
                } else {
                    return res.status(400).send({message: 'Houve um erro ao salvar o cd'});
                }
            });
        });
    },
    genero: function (req, res) {
        var genero = req.query.id;
        if (genero == null) return res.status(400).send({message: 'Parametros inválidos'});
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
        var today = new Date();
        if (query == null) return res.status(400).send({message: 'Parametros inválidos'});
        Cd.find({meta: {contains: query}}).populateAll().exec(function (err, cds) {
            if (err) return res.status(400).send({message: 'Erro ao fazer a busca'});
            Eventos.find({
                or: [
                    {nome: {contains: query}},
                    {descricao: {contains: query}}
                ]
            }).where({inicio: {">=": today}}).populateAll().exec(function (err, events) {
                if (err) return res.status(400).send({message: 'Erro ao buscar eventos'});
                Musica.find().where({nome: {contains: query}}).populate("cd").exec(function (err, musicas) {
                    if (err) return res.status(400).send({message: 'Erro ao buscar musicas'});
                    if(musicas.length > 0) {
                        var m = [];
                        _.each(musicas, function (musica) {
                            Usuarios.findOne({id: musica.cd.artista}).populateAll().exec(function (err, user) {
                                if (err) return res.status(400).send({message: 'Erro ao buscar artistas'});
                                musica.cd.artista = user;
                                m.push(musica);
                                if(m.length == musicas.length) {
                                    return res.status(200).send({message: "Ok", musicas: m, cds: cds, eventos: events});
                                }
                            });
                        });
                    } else {
                        return res.status(200).send({message: "Ok", musicas: [], cds: cds, eventos: events});
                    }
                });
            });
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
    }
};
