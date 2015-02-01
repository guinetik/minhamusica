/**
 * Musica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
var updateCdMeta = require('../services/updateCdMeta.js');
var Musica = module.exports = {
  afterCreate:function(newMusic, next) {
    if(newMusic.cd) {
      updateCdMeta(newMusic.cd, next);
    }
  },
  afterDestroy: function (deleted_record, next) {
    console.log("fd", deleted_record[0]);
    var filename = deleted_record[0].fd;
    fs.unlink(filename, function (err) {
      if(deleted_record[0].cd) {
        updateCdMeta(deleted_record[0].cd, next);
      }
      if (err) next(err);
    });
  },
  afterUpdate:function(newMusic, next) {
    if(newMusic.cd) {
      updateCdMeta(newMusic.cd, next);
    }
  },
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
    downloads: {
      type: 'integer',
      defaultsTo: 0
    },
    fd: {
      type: 'string',
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.fd;
      delete obj.updatedAt;
      return obj;
    }
  }
};

