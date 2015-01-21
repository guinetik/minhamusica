module.exports.routes = {
//auth routes
  '/admin/login': 'AuthController.loginAdmin',
  '/admin/logout': 'AuthController.logoutAdmin',
  'post /user/login': 'AuthController.login',
//banner routes
  'get /': 'BannersController.list',
  'post /banner/registrar': 'BannersController.createBanner',
  'post /banner/crop': 'BannersController.cropBanner',
  'get /banner/delete/': 'BannersController.deleteBanner',
  'post /banner/posicao': 'BannersController.changePosition',
//admin routes
  'get /admin/listar/': 'AdminController.list',
  'post /admin/registrar': 'AdminController.createAdmin',
  'get /admin/deletar/': 'AdminController.deleteAdmin',
  'post /admin/atualizar/': 'AdminController.updateAdmin',
// user
// data
  'get /data/estados': 'EstadosController.getEstados'
};
