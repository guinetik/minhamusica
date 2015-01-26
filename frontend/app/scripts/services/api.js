'use strict';

/**
 * @ngdoc service
 * @name musicaApp.Api
 * @description
 * # Api
 * Service in the musicaApp.
 */
angular.module('musicaApp').service('api', ['ws', '$upload', 'API_URL', api]);
function api(ws, $upload, API_URL) {
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
  api.addMusic = function (musica, cb) {
    $upload.upload({
      url: API_URL + 'cd/music/add',
      method: 'POST',
      data: {id_cd: musica.cd},
      file: musica.file
    }).progress(function (evt) {
      musica.progress = parseInt(100.0 * evt.loaded / evt.total);
      musica.status = 1;
      musica.message = 'Enviando: ' + musica.progress + '%';
    }).success(function (data, status, headers, config) {
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
      cb(data, status, headers, config);
    });
  };
  api.deleteMusic = function(music, token, cb) {
    ws.consumeService("musica/destroy/" + music.id, null, token, cb, false, "GET");
  };
  api.deleteCd = function(cd, token, cb) {
    ws.consumeService("cd/destroy/" + cd.id, null, token, cb, false, "GET");
  };
  api.updateMusic = function(music, token, cb) {
    var m = {
      id:music.id,
      nome:music.nome
    };
    ws.consumeService("musica/update/" + music.id, m, token, cb, false);
  };
  api.updateCover = function(file, capa, token, cb) {
    var data = {};
    if(capa.cd) {
      data.id = capa.cd;
    }
    $upload.upload({
      url: API_URL + 'cd/cover/update',
      method: 'POST',
      data: data,
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
      cb(data, status, headers, config);
    });
  };
  api.getUserCollection = function(token, cb) {
    ws.consumeService("usuarios/collection", null, token, cb, false, "GET");
  };
  api.getProfile = function(id, cb) {
    ws.consumeService("usuarios/perfil?id=" + id, null, null, cb, false, "GET");
  };
  api.getCD = function(id, cb) {
    ws.consumeService("cd/" + id, null, null, cb, false, "GET");
  };
  api.updateCD = function(cd, token, cb) {
    var c = {
      id:cd.id,
      titulo:cd.titulo,
      descricao:cd.descricao,
      private:cd.private,
      capa:cd.capa,
      genero:cd.genero
    };
    ws.consumeService("cd/update/" + cd.id, c, token, cb, false);
  }
}
