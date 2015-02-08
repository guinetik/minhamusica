/**
 * Eventos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Eventos = module.exports = {
    schema: true,
    attributes: {
        nome: {
            type: 'string',
            required: true
        },
        descricao: {
            type: 'string',
            required: true
        },
        local: {
            type: 'string',
            required: true
        },
        cidade: {
            model: 'Cidades',
            required:true
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
            model: 'Usuarios',
            required: true
        },
        foto: {
            type: 'string',
            required: true
        },
        link: {
            type: 'string',
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

