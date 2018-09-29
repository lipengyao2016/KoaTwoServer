var uuid = require('node-uuid');
var crypto = require('crypto');

exports.createUUID = ()=>{
    return   uuid.v1().toUpperCase();
};


exports.createUUID2 = ()=>{
    let uuid_md5 = null;
    do{
        let md5 = crypto.createHash('md5');
        uuid_md5 = md5.update(`${uuid.v1()}-${uuid.v4()}`).digest('base64');
    }while( uuid_md5.indexOf('/') != -1 || uuid_md5.indexOf('+') != -1);
    return uuid_md5.substr(0, uuid_md5.length-2);
};


for(let i = 0;i < 3;i++)
{
    console.log(exports.createUUID());
    //console.log(exports.createUUID2());
}

