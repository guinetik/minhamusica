module.exports = {
	get: function (req, res) {
		res.sendfile(req.path.substr(1));
	},
    download: function (req, res) {
        res.download(req.path.substr(1), req.path.substr(1));
    },
	_config: {
		rest: false,
		shortcuts: false
	}
};
