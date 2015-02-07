/**
 * Musica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
var updateCdMeta = require('../services/updateCdMeta.js');
var ZipCd = require("../services/zipCd.js");
var Musica = module.exports = {
    afterCreate: function (newMusic, next) {
        if (newMusic.cd) {
            ZipCd(newMusic[0].cd, function (aaa) {
                console.log("ZipCd", aaa);
                updateCdMeta(newMusic.cd, next);
            });
        }
    },
    afterDestroy: function (deleted_record, next) {
        console.log("fd", deleted_record[0]);
        var filename = deleted_record[0].fd;
        fs.unlink(filename, function (err) {
            if (deleted_record[0].cd) {
                ZipCd(deleted_record[0].cd, function (aaa) {
                    console.log("ZipCd", aaa);
                    updateCdMeta(deleted_record[0].cd, next);
                });
            }
            if (err) next(err);
        });
    },
    afterUpdate: function (newMusic, next) {
        if (newMusic.cd) {
            ZipCd(newMusic.cd, function (aaa) {
                console.log("ZipCd", aaa);
                updateCdMeta(newMusic.cd, next);
            });
        }
    },
    attributes: {
        nome: {
            type: 'string'
        },
        filename: {
            type: 'string'
        },
        track: {
            type: 'integer'
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
            type: 'string'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.fd;
            delete obj.updatedAt;
            return obj;
        }
    }
};

