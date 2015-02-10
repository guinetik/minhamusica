'use strict';

/**
 * @ngdoc service
 * @name musicaApp.Api
 * @description
 * # Api
 * Service in the musicaApp.
 */
angular.module('musicaApp').service('api', ['ws', '$upload', 'API_URL', 'blockUI', api]);
function api(ws, $upload, API_URL, blockUI) {
    var api = this;
    api.getEstados = function (cb) {
        ws.consumeService("data/estados", null, null, cb, false, "GET");
    };
    api.getHome = function (cb) {
        ws.consumeService("data/home", null, null, cb, false, "GET");
    };
    api.getGeneros = function (cb) {
        ws.consumeService("data/generos", null, null, cb, false, "GET");
    };
    api.signup = function (user, cb) {
        ws.consumeService("usuarios/create", user, null, cb, false);
    };
    api.login = function (user, cb) {
        ws.consumeService("user/login", user, null, cb, false);
    };
    api.lookup = function (token, cb) {
        ws.consumeService("usuarios/lookup", null, token, cb, false);
    };
    api.addCd = function (token, cd, cb) {
        ws.consumeService("cd/add", cd, token, cb, false);
    };
    api.addEvento = function (token, evento, cb) {
        evento.local = evento.local.name;
        ws.consumeService("eventos/create", evento, token, cb, false);
    };
    api.saveCd = function (token, cd, cb) {
        ws.consumeService("cd/save", {id_cd: cd.id}, token, cb, false);
    };
    api.addMusic = function (musica, token, cb) {
        blockUI.start();
        $upload.upload({
            url: API_URL + 'cd/music/add',
            method: 'POST',
            data: {id_cd: musica.cd, track: musica.track},
            headers: {
                token: token
            },
            file: musica.file
        }).progress(function (evt) {
            musica.progress = parseInt(100.0 * evt.loaded / evt.total);
            musica.status = 1;
            musica.message = 'Enviando: ' + musica.progress + '%';
        }).success(function (data, status, headers, config) {
            blockUI.stop();
            if (status == 200) {
                musica.status = 2;
                musica.message = 'Enviada';
                musica.cd = data.musica.cd;
                musica.id = data.musica.id;
                musica.nome = data.musica.nome;
                musica.filename = data.musica.filename;
                delete musica.file;
            } else {
                musica.status = -1;
                musica.message = 'Erro ao enviar';
            }
            data.status = status;
            cb(data, status, headers, config);
        });
    };
    api.deleteMusic = function (music, token, cb) {
        ws.consumeService("musica/destroy/" + music.id, {id_music: music.id}, token, cb, false, "POST");
    };
    api.deleteCd = function (cd, token, cb) {
        ws.consumeService("cd/destroy/" + cd.id, {id_cd: cd.id}, token, cb, false, "POST");
    };
    api.deleteEvent = function (event, token, cb) {
        ws.consumeService("eventos/destroy/" + event.id, {id_evento: event.id}, token, cb, false, "POST");
    };
    api.updateMusic = function (music, token, cb) {
        var m = {
            id_music: music.id,
            cd: music.cd,
            nome: music.nome
        };
        ws.consumeService("musica/update/" + music.id, m, token, cb, false);
    };
    api.updateEvent = function (event, token, cb) {
        var e = {
            id:event.id,
            id_event: event.id,
            nome:event.nome,
            local:event.local.name,
            cidade:event.cidade.id,
            inicio:event.inicio,
            fim:event.fim,
            foto:event.foto,
            link:event.link
        };
        ws.consumeService("eventos/update/" + event.id, e, token, cb, false);
    };
    api.updateTrack = function (music, token, cb) {
        var m = {
            id_music: music.id,
            track: music.track
        };
        ws.consumeService("musica/update/track", m, token, cb, false);
    };
    api.updateCover = function (file, capa, token, cb) {
        var data = {};
        if (capa.cd) {
            data.id = capa.cd;
        }
        blockUI.start();
        $upload.upload({
            url: API_URL + 'cd/cover/update',
            method: 'POST',
            data: data,
            headers: {
                token: token
            },
            file: file
        }).progress(function (evt) {
            capa.progress = parseInt(100.0 * evt.loaded / evt.total);
            capa.status = 1;
            capa.message = 'Enviando: ' + capa.progress + '%';
        }).success(function (data, status, headers, config) {
            if (status == 200) {
                capa.status = 2;
                capa.message = 'Enviada';
                capa.imagem = data.imagem;
            } else {
                capa.status = -1;
                capa.message = 'Erro ao enviar';
            }
            blockUI.stop();
            cb(data, status, headers, config);
        });
    };
    api.updateUserCover = function (file, capa, token, cb) {
        var data = {};
        if (capa.user) {
            data.id_user = capa.user;
        }
        blockUI.start();
        $upload.upload({
            url: API_URL + 'user/cover/update',
            method: 'POST',
            data: data,
            headers: {
                token: token
            },
            file: file
        }).progress(function (evt) {
            capa.progress = parseInt(100.0 * evt.loaded / evt.total);
            capa.status = 1;
            capa.message = 'Enviando: ' + capa.progress + '%';
        }).success(function (data, status, headers, config) {
            if (status == 200) {
                capa.status = 2;
                capa.message = 'Enviada';
                capa.imagem = data.imagem;
            } else {
                capa.status = -1;
                capa.message = 'Erro ao enviar';
            }
            blockUI.stop();
            cb(data, status, headers, config);
        });
    };
    api.updateUserFoto = function (file, foto, token, cb) {
        var data = {};
        if (foto.user) {
            data.id_user = foto.user;
        }
        blockUI.start();
        $upload.upload({
            url: API_URL + 'user/foto/update',
            method: 'POST',
            data: data,
            headers: {
                token: token
            },
            file: file
        }).progress(function (evt) {
            foto.progress = parseInt(100.0 * evt.loaded / evt.total);
            foto.status = 1;
            foto.message = 'Enviando: ' + foto.progress + '%';
        }).success(function (data, status, headers, config) {
            if (status == 200) {
                foto.status = 2;
                foto.message = 'Enviada';
                foto.imagem = data.imagem;
            } else {
                foto.status = -1;
                foto.message = 'Erro ao enviar';
            }
            blockUI.stop();
            cb(data, status, headers, config);
        });
    };
    api.updateEventPicture = function (file, foto, token, cb) {
        var data = {};
        if (foto.evento) {
            data.id_evento = foto.evento;
        }
        blockUI.start();
        $upload.upload({
            url: API_URL + 'evento/foto/update',
            method: 'POST',
            data: data,
            headers: {
                token: token
            },
            file: file
        }).progress(function (evt) {
            foto.progress = parseInt(100.0 * evt.loaded / evt.total);
            foto.status = 1;
            foto.message = 'Enviando: ' + foto.progress + '%';
        }).success(function (data, status, headers, config) {
            if (status == 200) {
                foto.status = 2;
                foto.message = 'Enviada';
                foto.imagem = data.imagem;
            } else {
                foto.status = -1;
                foto.message = 'Erro ao enviar';
            }
            blockUI.stop();
            cb(data, status, headers, config);
        });
    };
    api.getUserCollection = function (token, cb) {
        ws.consumeService("usuarios/collection", null, token, cb, false, "GET");
    };
    api.getUserEvents = function (token, cb) {
        ws.consumeService("usuarios/eventos", null, token, cb, false, "GET");
    };
    api.getProfile = function (id, cb) {
        ws.consumeService("usuarios/perfil?id=" + id, null, null, cb, false, "GET");
    };
    api.getCD = function (id, cb) {
        ws.consumeService("cd/" + id, null, null, cb, false, "GET");
    };
    api.getEvent = function (id, cb) {
        ws.consumeService("eventos/" + id, null, null, cb, false, "GET");
    };
    api.updateProfile = function (user, token, cb) {
        var u = {
            id_user: user.id,
            id: user.id,
            nome: user.nome,
            email: user.email,
            sexo: user.sexo,
            cidade: user.cidade,
            twitter: user.twitter,
            facebook: user.facebook,
            instagram: user.instagram,
            nascimento: user.nascimento
        };
        ws.consumeService("usuarios/" + user.id, u, token, cb, false);
    };
    api.updateCD = function (cd, token, cb) {
        var c = {
            id_cd: cd.id,
            id: cd.id,
            titulo: cd.titulo,
            descricao: cd.descricao,
            private: cd.private,
            capa: cd.capa,
            genero: cd.genero
        };
        ws.consumeService("cd/update/" + cd.id, c, token, cb, false);
    };
    api.updatePassword = function (user, token, cb) {
        user.id_user = user.id;
        ws.consumeService("user/password/update", user, token, cb, false);
    };
    api.downloadCD = function (id, cb) {
        ws.consumeService("cd/download/", {id: id}, null, cb, false, "POST");
    };
    api.downloadMusic = function (id, cb) {
        ws.consumeService("musica/download/", {id: id}, null, cb, false, "POST");
    };
    api.getCdsByGenero = function (id, cb) {
        ws.consumeService("cd/genero?id=" + id, null, null, cb, false, "GET");
    };
    api.searchCD = function (q, cb) {
        ws.consumeService("cd/search?q=" + q, null, null, cb, false, "GET");
    };
    api.searchPlace = function(query, cidade, cb) {
        var cid = "EKMXJ3PZOKGAGZIVNWTRLXTTSMW4KOXSD0X0RROJCBNYDYB4";
        var shh = "NMTM2OWFGHC3XDINPQBWT4LO1HSOLLAWZGJKNRABFSBSFOS2";
        var url = "https://api.foursquare.com/v2/venues/search";
        url += "?client_id=" + cid;
        url += "&client_secret=" + shh;
        url += "&v=20130815";
        url += "&near=" + cidade.nome;
        url += "&query=" + query;
        ws.consumeService(url, null, null, function(result){
            //console.log("searchPlace", result);
            cb(result);
        }, true, "GET", false);

    };
}
