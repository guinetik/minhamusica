/**
 * Estado.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Estados = module.exports = {
  schema: true,
  tableName: 'estados',
  attributes: {
    nome: {
      type: 'string',
      maxLength: 100
    },
    sigla: {
      type: 'string',
      maxLength: 3,
      unique: true
    },
    cidades: {
      collection: 'cidades',
      via: 'estado'
    }
  }
};

