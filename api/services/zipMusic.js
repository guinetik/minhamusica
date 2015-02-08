/**
 * Created by guinetik on 2/1/15.
 */
var JSZip = require("jszip");
var fs = require("fs");
module.exports = ZipMusic;
function ZipMusic(id, cb) {
    function showZero(s) {
        if (s < 10) return "0" + s;
        else return s;
    }
    Musica.findOne({id: id}).populateAll().exec(function MusicFound(err, musica) {
        if (err) {
            console.log("ZipMusic ERR", err);
            cb(false);
        }
        try {
            console.log("musica", musica);
            var zip = new JSZip();
            var zipname = 'public/downloads/' + id + '.zip';
            var titulo = musica.cd.titulo;
            zip.file("leia-me.txt", titulo + "\nDownload em http://www.musicatop.com\n");
            zip.folder(titulo).file(showZero(musica.track) + " " + musica.nome + ".mp3", fs.readFileSync("public/music/" + musica.filename));
            var content = zip.generate({type: "nodebuffer"});
            fs.writeFile(zipname, content, function (err) {
                if (err) {
                    console.log("ZipMusic ERR", err);
                    cb(false);
                }
                cb(true);
            });
        } catch (error) {
            console.log("ZipMusic ERR", error);
            cb(false);
        }
    });
}