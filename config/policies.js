module.exports.policies = {
    'BannersController': {
        '*': ['sessionAuth']
    },
    'AdminController': {
        '*': ['sessionAuth']
    },
    'CdController': {
        'download': true,
        'genero': true,
        'search': true,
        'save': ['isOwner'],
        'update': ['isOwner'],
        'add': ['jwtAuth'],
        'updateCover': ['jwtAuth'],
        'destroy': ['isOwner']
    },
    'MusicaController': {
        'download': true,
        'addMusic': ['isOwner'],
        'update_track': ['isOwner'],
        'update': ['isOwner'],
        'destroy': ['isOwner']
    },
    'UsuariosController': {
        'create': true,
        'lookup': true,
        'perfil': true,
        'updatePassword': ['isOwner'],
        'collection': ['jwtAuth'],
        'updateCover': ['isOwner'],
        'updateFoto': ['isOwner'],
        'update': ['isOwner'],
        'destroy': ['sessionAuth']
    }
};
