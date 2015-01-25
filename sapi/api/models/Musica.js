/**
 * Musica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
module.exports = {
  attributes: {
    nome: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    tempo: {
      type: 'string'
    },
    cd: {
      model: 'Cd'
    },
    downloads:{
      type:'integer',
      default:0
    }
  },
  afterDestroy: function(deleted_record, next){
    var musica = deleted_record[0];
    fs.unlink(musica.url, function(err) {
      if(err) throw err;
      next();
    });
  }
};

