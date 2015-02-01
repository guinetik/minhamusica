/**
 * Created by guinetik on 2/1/15.
 */
module.exports = function (id, cb) {
    Cd.findOne({id: id}).populateAll().exec(function (err, cd) {
        if (err) {
            if(next) next();
        }
        console.log("cd", cd);
        var metadata = cd.titulo + ".";
        metadata += cd.descricao + ".";
        if(cd.genero) {
            metadata += cd.genero.nome + ".";
        }
        metadata += cd.artista.nome + ".";
        _.each(cd.musicas, function (m) {
            metadata += m.nome + ".";
        });
        console.log("metadata", metadata);
        cb(metadata.slice(0, -1));
    });
};