module.exports.policies = {
 'BannersController':{
    '*' : ['sessionAuth'],
    'list':true
  },
 'AdminController':{
    '*' : ['sessionAuth']
  }
};
