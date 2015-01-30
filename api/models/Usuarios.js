var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var Usuarios = module.exports = {
  tableName: 'usuarios',
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
      type: 'string',
      required: true
    },
    sexo: {
      type: 'string',
      required: true,
      maxLength: 1
    },
    nascimento: {
      type: 'date',
      required: true
    },
    cidade: {
      model: 'Cidades'
    },
    capa: {
      type: 'string',
      required:true,
      defaultsTo:"capa.jpg"
    },
    foto: {
      type: 'string',
      required:true,
      defaultsTo:"foto.jpg"
    },
    twitter: {
      type: 'string',
      maxLength: 100
    },
    instagram: {
      type: 'string',
      maxLength: 100
    },
    facebook: {
      type: 'string'
    },
    eventos: {
      colletion: 'evento',
      via: 'usuario'
    },
    cds: {
      colletion: 'cd',
      via: 'artista'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.senha;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  },
  beforeCreate: function (attr, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        next(err);
      }
      bcrypt.hash(attr.senha, salt, null, function (err, hash) {
        if (err) return next(err);
        attr.senha = hash;
        next();
      });
    });
  },
  findOneByToken: function (token, cb) {
    try {
      var palyload = jwt.decode(token, 'shhh..');
      this.findOne({id:palyload.sub}).populateAll().exec(function (err, foundUser) {
        if (!foundUser) {
          cb(false);
        }
        cb(foundUser);
      });
    } catch (err) {
      console.log("findOneByToken", err);
      cb(false);
    }
  }
};

