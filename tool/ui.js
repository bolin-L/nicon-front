var gulp = require('gulp');
var glob = require('glob');
var fs = require('fs');
var nodePath = require('path');
var fse = require('fs-extra');
var program = require('commander');
var handlebars = require('handlebars');

program
    .version('0.1.0')
    .option('-p, --page [value]', 'the pageName ui belong to')
    .option('-n, --name [value]', 'ui name')
    .parse(process.argv);

// 读取文件
function readFile(path){
    return new Promise(function (resolve, reject) {
        fs.readFile(path,'utf8',function (err, data) {
            if(err){
                reject(err);
            }else {
                resolve({data: data, path: path});
            }
        });
    })
}

// 驼峰改xx-xx
function changeFormat(name) {
    var reg = /([A-Z])/g;
    name = name.replace(reg, function ($1, $2) {
        return '-' +  $2.toLowerCase();
    });
    return name;
}

function buildUI() {
    var pageName = program.page || 'common',
        uiName = program.name,
        uiPath = nodePath.resolve(__dirname, '../src/components/'),
        srcPath = nodePath.resolve(__dirname, './uiTemplate/*.*'),
        distPath = nodePath.resolve(uiPath, pageName + '/' + uiName + '/');

    if(!uiName) {
        console.log("error! need pass name param in package.json, like: --name topBar");
        return;
    }

    glob(srcPath, function (err, files) {
        if(err){
            console.log(err);
            return;
        }
        for(var i = 0; i < files.length; i++){
            readFile(files[i]).then(function (result) {
                var template = handlebars.compile(result.data),
                    str = template({
                        uiName: changeFormat(uiName),
                        pageName: changeFormat(pageName)
                    });
                var fileName = result.path.replace(/(.*)\/\w+\..*$/, function ($1, $2) {
                    return $1.replace($2, distPath);
                });
                if(!fs.existsSync(fileName)){
                    console.log("build " + fileName);
                    fse.outputFileSync(fileName, str);
                }else {
                    console.log("already exist "+fileName);
                }

            })
        }
    });
}

buildUI();
