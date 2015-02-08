/**
 * MusicaController
 *
 * @description :: Server-side logic for managing musicas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var ZipMusic = require("../services/zipMusic.js");
var MusicaController = module.exports = {
    addMusic: function (req, res) {
        var uploadFile = req.file('file');
        if (!req.body.id_cd) {
            return res.status(404).send({message: 'Erro ao salvar a música. Cd não encontrado'});
        }
        Cd.findOneById(req.body.id_cd, function (err, cd) {
            if (err) return res.status(404).send({message: 'Erro ao salvar a música. Cd não encontrado'});
            uploadFile.upload({dirname: './../../public/music'}, function onUploadComplete(err, files) {
                if (err) return res.serverError(err);
                var song = {
                    nome: files[0].filename,
                    track: req.body.track,
                    filename: files[0].fd.split("/").pop(),
                    cd: cd,
                    fd: files[0].fd
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
    },
    updateTrack: function (req, res) {
        var musica = req.body;
        if (musica.id_music != null && musica.track != null) {
            Musica.update({id: musica.id_music}, {track: musica.track}, function (err, musica) {
                if (err) return res.status(404).send({message: 'Erro ao salvar a música'});
                return res.status(200).send({message: 'Música Salva com sucesso', musica: musica});
            });
        } else {
            return res.status(400).send({message: 'Request incompleto'});
        }
    },
    download: function (req, res) {
        var id = req.body.id;
        if (id == null) return res.status(400).send({message: 'Parametros inválidos'});
        ZipMusic(id, function (result) {
            if (result) {
                return res.status(200).send({
                    message: 'Inicializando download...',
                    url: '/public/downloads/' + id + '.zip'
                });
            } else {
                return res.status(400).send({message: 'Erro ao fazer o download da musica'});
            }
        });
    }
};
