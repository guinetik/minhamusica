module.exports.routes = {
//auth routes
  'post /admin/login': 'AuthController.loginAdmin',
  'post /admin/logout': 'AuthController.logoutAdmin',
  'post /user/login': 'AuthController.login',
//banner routes
  'get /': 'BannersController.list',
  'get /banner/delete/': 'BannersController.deleteBanner',
  'post /banner/registrar': 'BannersController.createBanner',
  'post /banner/crop': 'BannersController.cropBanner',
  'post /banner/posicao': 'BannersController.changePosition',
//admin routes
  'get /admin/listar/': 'AdminController.list',
  'get /admin/deletar/': 'AdminController.deleteAdmin',
  'post /admin/registrar': 'AdminController.createAdmin',
  'post /admin/atualizar/': 'AdminController.updateAdmin',
// user
// data
  'get /data/estados': 'EstadosController.getEstados'
};
