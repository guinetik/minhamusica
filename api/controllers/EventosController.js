/**
 * EventosController
 *
 * @description :: Server-side logic for managing eventos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var EventosController = module.exports = {
    create: function (req, res) {
        Eventos.create(req.body).exec(function createCB(err, evento) {
            if (err) {
                console.log("EventosController.create ERR", err);
                return res.status(400).send({message: 'Erro ao salvar o evento'});
            }
            return res.status(200).send({message: 'Evento salvo com sucesso', evento: evento});
        });
    },
    latest: function (req, res) {
        var today = new Date();
        Eventos.find().
            //where({inicio: {">=": today}}).
            populateAll().exec(function (err, eventos) {
            if (err) {
                console.log("EventosController.latest ERR", err);
                return res.status(400).send({message: 'Erro ao consultar os eventos'});
            }
            return res.status(200).send({message: 'Ok', eventos: eventos});
        });
    },
    update: function (req, res) {
        console.log("id", req.body);
        Eventos.update({id: req.body.id}, req.body).exec(function createCB(err, evento) {
            if (err) {
                console.log("EventosController.create ERR", err);
                return res.status(400).send({message: 'Erro ao salvar o evento'});
            }
            return res.status(200).send({message: 'Evento salvo com sucesso', evento: evento});
        });
    },
    updateFoto: function (req, res) {
        var uploadFile = req.file('file');
        var evento = req.body;
        uploadFile.upload({dirname: '../../public/img'}, function onUploadComplete(err, files) {
            if (err) return res.serverError(err);
            var imagem = files[0].fd.split("/").pop();
            if (evento.id_evento != null) {
                Eventos.update({id: evento.id_evento}, {foto: imagem}).exec(function (err, updated) {
                    if (err) return res.status(400).send({message: 'Erro ao atualizar a foto'});
                    return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
                });
            } else {
                return res.status(200).send({message: 'Imagem Enviada', imagem: imagem});
            }
        });
    }
};

