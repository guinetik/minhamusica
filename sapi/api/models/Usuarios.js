var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
module.exports = {
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
    },
	foto: {
      type: 'string',
    },
    twitter: {
      type: 'string',
      maxLength: 100
    },
    instagram: {
      type: 'string',
      maxLength: 100
    },
    facebookId: {
      type: 'string'
    },
	eventos: {
      colletion : 'evento',
	  via: 'usuario' 	
    },
	cds: {
      colletion : 'cd',
	  via: 'artista' 	
    },
    toJSON: function() {
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
  findOneByToken:function(token, cb) {
    var palyload = jwt.decode(token, 'shhh..');
    Usuarios.findOneById(palyload.sub).populate("cidade").exec(function (err, foundUser) {
      if (!foundUser) {
        cb(false);
      }
      cb(foundUser);
    });
  }
};

