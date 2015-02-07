/**
 * Created by guinetik on 2/1/15.
 */
var JSZip = require("jszip");
var fs = require("fs");
module.exports = ZipCd;
function ZipCd(id, cb) {
    function showZero(s) {
        if(s < 10) return "0" + s;
        else return s;
    }
    Cd.findOne({id: id}).populateAll().exec(function cdFound(err, cd) {
        if (err) {
            //console.log("ZipCd ERR", err);
            cb(false);
        }
        var zip = new JSZip();
        var titulo = cd.artista.nome + " - " + cd.titulo;
        zip.file("leia-me.txt", titulo + "\nDownload em http://www.musicatop.com\n");
        _.each(cd.musicas, function (song) {
            zip.folder(titulo).file(showZero(song.track) + " " + song.nome + ".mp3", fs.readFileSync("public/music/" + song.filename));
        });
        var content = zip.generate({type: "nodebuffer"});
        fs.writeFile('public/downloads/' + cd.id + '.zip', content, function (err) {
            //console.log("ZipCd ERR", err);
            cb();
        });
    });
}