/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	  list: function (req, res, next) {
		Admin.find({}).limit(1).exec(function(err, users) {
		  if (err) return next(err);
		  user = users[0]
		  res.view({user: user});
      })    
  },

};

