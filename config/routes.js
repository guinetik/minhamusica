module.exports.routes = {
  'get /': '/app',
  'get /cd/:id': '/app',
  //auth routes
  '/admin/login': 'AuthController.loginAdmin',
  '/admin/logout': 'AuthController.logoutAdmin',
  'post /user/login': 'AuthController.login',
  //banner routes
  'get /banner/delete/': 'BannersController.deleteBanner',
  'post /banner/registrar': 'BannersController.createBanner',
  'post /banner/crop': 'BannersController.cropBanner',
  'post /banner/posicao': 'BannersController.changePosition',
  //admin routes
  'get /admin/listar/': 'AdminController.list',
  'get /admin/deletar/': 'AdminController.deleteAdmin',
  'post /admin/registrar': 'AdminController.createAdmin',
  'post /admin/atualizar/': 'AdminController.updateAdmin',
  //genero routes
  'get /genero/listar/': 'GenerosController.list',
  'get /genero/deletar/': 'GenerosController.deleteGenero',
  'post /genero/registrar': 'GenerosController.createGenero',
  'post /genero/atualizar/': 'GenerosController.updateGenero',
  // data
  'get /data/estados': 'EstadosController.getEstados',
  'get /data/home': 'HomeController.gethome',
  'get /data/generos': 'GenerosController.getGeneros',
  // cd
  'post /cd/music/add': 'MusicaController.addMusic',
  'post /cd/cover/update': 'CdController.updateCover',
  //usuario
  'post /user/cover/update': 'UsuariosController.updateCover',
  'post /user/foto/update': 'UsuariosController.updateFoto',
  'post /user/password/update': 'UsuariosController.updatePassword',
  //file management
  'get /public/img/*': {
    controller: 'FileController',
    action: 'get'
  },
  'get /public/music/*': {
    controller: 'FileController',
    action: 'get'
  }
};
