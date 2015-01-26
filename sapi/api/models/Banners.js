/**
 * Banners.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Banners = module.exports = {
  tableName: 'banners',
  schema: true,
  attributes: {
    titulo: {
      type: 'string',
      required: true,
      maxLength: 200
    },
    url: {
      type: 'string'
    },
    img: {
      type: 'string',
      required: true
    },
    posicao: {
      type: 'integer'
    }
  },
  beforeCreate: function (attr, next) {
    Banners.find({})
      .sort('createdAt DESC')
      .limit(1)
      .exec(function findCB(err, ultimo) {
        if (err) next(err);
        if (ultimo.length) {
          var pos = ultimo[0];
          console.log('incrementa');
          attr.posicao = pos.posicao + 1;
        } else {
          console.log('seta 1');
          attr.posicao = 1;
        }
        next();
      });
  }
};

