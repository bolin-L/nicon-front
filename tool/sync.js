var fs = require("fs-extra"),
    glob = require("glob"),
    path = require("path");

var from = path.join(__dirname, "../lib/icon/fonts"),
    to = path.join(__dirname, '../static/fonts');

var copy = function (from, to, err, files) {
    if (err){
        console.error(err);
        return;
    }
    files.forEach(function (name) {
        fs.copySync(name,name.replace(from,to));
    });
};


function sync() {
    glob(from + "**", copy.bind(this, from, to));
}

sync();
