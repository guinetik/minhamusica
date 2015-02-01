/**
 * Created by guinetik on 2/1/15.
 */
var getCdMeta = require("./getCdMeta.js");
module.exports = function (id, next) {
    getCdMeta(id, function cb(metadata) {
        Cd.update({id: id}, {meta: metadata}).exec(function (err, s) {
            next();
        });
    });
};