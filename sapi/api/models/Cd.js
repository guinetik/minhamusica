/**
 * Cd.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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
      type: 'integer',
      default: 0
    },
    downloads: {
      type: 'integer',
      default: 0
    },
    musicas: {
      collection: 'Musica',
      via: 'cd'
    }
  }
};
