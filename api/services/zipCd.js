/**
 * Created by guinetik on 2/1/15.
 */
var JSZip = require("jszip");
var fs = require("fs");
module.exports = ZipCd;
function ZipCd(id, cb) {
    function showZero(s) {
        if (s < 10) return "0" + s;
        else return s;
    }

    Cd.findOne({id: id}).populateAll().exec(function cdFound(err, cd) {
        if (err) {
            console.log("ZipCd ERR", err);
            cb(false);
        }
        try {
            var zip = new JSZip();
            var zipname = 'public/downloads/' + cd.id + '.zip';
            var titulo = cd.artista.nome + " - " + cd.titulo;
            zip.file("leia-me.txt", titulo + "\nDownload em http://www.musicatop.com\n");
            _.each(cd.musicas, function (song) {
                zip.folder(titulo).file(showZero(song.track) + " " + song.nome + ".mp3", fs.readFileSync("public/music/" + song.filename));
            });
            zip.folder(titulo).file("capa.jpg", fs.readFileSync("public/img/" + cd.capa));
            var content = zip.generate({type: "nodebuffer"});
            fs.writeFile(zipname, content, function (err) {
                if (err) {
                    console.log("ZipCd ERR", err);
                    cb(false);
                }
                var stats = fs.statSync(zipname);
                var fileSizeInBytes = stats["size"];
                var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
                Cd.update({id: id}, {size: fileSizeInMegabytes.toFixed(2)}).exec(function (err, updatedCD) {
                    if (err) {
                        console.log("ZipCd ERR", err);
                        cb(false);
                    }
                    console.log("UpdatedCD", updatedCD);
                    cb(true);
                });
            });
        } catch (error) {
            console.log("ZipCd ERR", error);
            cb(false);
        }
    });
}