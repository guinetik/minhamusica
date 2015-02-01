/**
 * Cd.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Cd = module.exports = {
  attributes: {
    artista: {
      model: 'Usuarios'
    },
    titulo: {
      type: 'string'
    },
    descricao: {
      type: 'string'
    },
    capa: {
      type: 'string'
    },
    genero: {
      model: 'Generos'
    },
    private: {
      type: 'boolean',
      defaultsTo: false,
      boolean: true
    },
    downloads: {
      type: 'integer',
      defaultsTo: 0
    },
    musicas: {
      collection: 'Musica',
      via: 'cd'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.updatedAt;
      return obj;
    }
  }
};
