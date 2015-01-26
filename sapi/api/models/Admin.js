var bcrypt = require('bcrypt-nodejs');
/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Admin = module.exports = {
  tableName: 'admin',
  schema: true,
  attributes: {
    nome: {
      type: 'string',
      required: true,
      maxLength: 200
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 100
    },
    senha: {
      type: 'string'
    }
  },
  beforeCreate: function (attr, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        next(err);
      }

      bcrypt.hash(attr.senha, salt, null, function (err, hash) {

        if (err) next(err);

        attr.senha = hash;
        next();

      });

    });
  },
  beforeUpdate: function (attr, next) {
    if (typeof(attr.senha) === 'undefined') {
      delete attr.senha;
      next();
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          next(err);
        }

        bcrypt.hash(attr.senha, salt, null, function (err, hash) {

          if (err) next(err);

          attr.senha = hash;
          next();

        });
      });
    }
  }
};
