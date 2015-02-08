/**
 * Cd.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var getCdMeta = require('../services/getCdMeta.js');
var Cd = module.exports = {
    beforeUpdate: function (updated, next) {
        if (updated.id) {
            getCdMeta(updated.id, function (metadata) {
                updated.meta = metadata;
                next();
            })
        } else next();
    },
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
        meta: {
            type: "string"
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
        size: {
            type: 'String',
            defaultsTo: "0"
        },
        musicas: {
            collection: 'Musica',
            via: 'cd'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.meta;
            delete obj.updatedAt;
            return obj;
        }
    }
};
