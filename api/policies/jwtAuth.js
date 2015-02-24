var findOneByToken = require('../services/findOneByToken.js');
module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.token) {
        return res.status(401).send({
            message: 'You are not Authorized'
        });
    }
    console.log("token", req.headers['token'], req.headers.token);
    findOneByToken(req.headers['token'], function (result) {
        if (result) {
            next();
        } else {
            return res.status(401).send({
                message: 'You are not Authorized'
            });
        }
    });
};
