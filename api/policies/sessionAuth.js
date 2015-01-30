module.exports = function (req, res, next) {
  if (req.session.authenticated) {
    return next();
  }


  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
  // return res.forbidden('opppa');
  return res.redirect('/admin/login');

};
