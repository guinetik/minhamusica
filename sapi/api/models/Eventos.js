/**
 * Eventos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Eventos = module.exports = {
  attributes: {
    titulo: {
      type: 'string',
      required: true
    },
    descricao: {
      type: 'string',
      required: true
    },
    inicio: {
      type: 'date',
      required: true
    },
    fim: {
      type: 'date',
      required: true
    },
    usuario: {
      model: 'usuarios',
      required: true
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};

