var jwt = require('jwt-simple');
module.exports = function (token, cb) {
    try {
        var palyload = jwt.decode(token, 'shhh..');
        Usuarios.find({id: palyload.sub}).populateAll().exec(function (err, foundUser) {
            if (!foundUser) {
                cb(false);
            }
            cb(foundUser);
        });
    } catch (err) {
        console.log("findOneByToken", err);
        cb(false);
    }
};