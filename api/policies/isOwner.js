var findOneByToken = require('../services/findOneByToken.js');
module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.token) {
        return res.status(401).send({
            message: 'You are not Authorized. Error #001'
        });
    }
    console.log("starting isOwner");
    console.log("token", req.headers['token']);
    console.log("id_cd", req.body.id_cd);
    console.log("id_music", req.body.id_music);
    console.log("id_user", req.body.id_user);
    findOneByToken(req.headers['token'], function (result) {
        if (result) {
            if (req.body.id_cd != undefined) {
                Cd.findOne({id: req.body.id_cd}).exec(function (err, cd) {
                    if (err) {
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #003'
                        });
                    }
                    try {
                        if (cd.artista == result.id) {
                            next();
                        } else {
                            return res.status(401).send({
                                message: 'You are not Authorized. Error #004'
                            });
                        }
                    } catch (err) {
                        //console.log("isOwner ERR", err);
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #005'
                        });
                    }
                });
            } else if (req.body.id_music != undefined) {
                Musica.findOne({id: req.body.id_music}).populateAll().exec(function (err, musica) {
                    if (err) {
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #006'
                        });
                    }
                    //console.log("musica", musica);
                    try {
                        if (musica.cd.artista == result.id) {
                            next();
                        } else {
                            return res.status(401).send({
                                message: 'You are not Authorized. Error #007'
                            });
                        }
                    } catch (err) {
                        console.log("isOwner ERR", err);
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #008'
                        });
                    }
                });
            } else if (req.body.id_user != undefined) {
                Usuarios.findOne({id: req.body.id_user}).populateAll().exec(function (err, user) {
                    if (err) {
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #011'
                        });
                    }
                    //console.log("user", user);
                    try {
                        if (user.id == req.body.id_user) {
                            next();
                        } else {
                            return res.status(401).send({
                                message: 'You are not Authorized. Error #012'
                            });
                        }
                    } catch (err) {
                        console.log("isOwner ERR", err);
                        return res.status(401).send({
                            message: 'You are not Authorized. Error #013'
                        });
                    }
                });
            } else {
                //console.log("yolo");
                return res.status(401).send({
                    message: 'You are not Authorized. Error #009'
                });
            }
        } else {
            return res.status(401).send({
                message: 'You are not Authorized. Error #010'
            });
        }
    });
};
