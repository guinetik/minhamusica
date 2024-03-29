/**
 * Cidade.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Cidade = module.exports = {
  schema: true,
  tableName: 'cidades',
  attributes: {
    nome: {
      type: 'string',
      maxLength: 100
    },
    estado: {
      model: 'Estados'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};

