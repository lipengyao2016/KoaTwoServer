/**
 * Created by Administrator on 2016/12/31.
 */

var fs = require('fs');

exports.saveFile = function (filePath,buf,bSync) {

    if(bSync)
    {
        return fs.writeFileSync(filePath,buf);
    }
    else
    {
        return new Promise(function(resolve, reject) {
            fs.writeFile(filePath,buf,null,function (wErr,writeRet) {
                if (wErr) reject(wErr);
                console.log('uploadFileData uploaded to: ' + filePath + ' success.');
                resolve('ok');
            })
        });
    }


}

exports.readFileData = function (filePath,bSync) {

    if(bSync)
    {
        return fs.readFileSync(filePath,null);
    }
    else
    {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath,null,function (err,data) {
                if(err) reject(err);
                resolve(data);
            })
        })
    }


}