module.exports.routes = {
//auth routes
  '/admin/login': 'AuthController.loginAdmin',
  '/admin/logout': 'AuthController.logoutAdmin',
  
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
	
//genero routes
  'get /genero/listar/': 'GenerosController.list',
  'get /genero/deletar/': 'GenerosController.deleteGenero',
  'post /genero/registrar': 'GenerosController.createGenero',
  'post /genero/atualizar/': 'GenerosController.updateGenero',	
	
// user
// data
  'get /data/estados': 'EstadosController.getEstados',
  'get /data/home' : 'HomeController.gethome',
  'get /data/generos' : 'GenerosController.getGeneros',	
	
// cd 
  'post /cd/download' : 'CdController.createDownload',
// home do site	

	
};
