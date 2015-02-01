/**
 * Musica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
var Musica = module.exports = {
  attributes: {
    nome: {
      type: 'string'
    },
    filename: {
      type: 'string'
    },
    tempo: {
      type: 'string'
    },
    cd: {
      model: 'Cd'
    },
    artista:function() {
      console.log("cd", this.cd);
      return this.cd.artista;
    },
    downloads: {
      type: 'integer',
      defaultsTo: 0
    }
  },
  afterDestroy: function (deleted_record, next) {
    var filename = './../../public/music/' + deleted_record[0].filename;
    fs.unlink(filename, function (err) {
      if (err) next(err);
      next();
    });
  }
};

