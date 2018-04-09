/**
 * Created by Administrator on 2016/12/12.
 */

const directoryTranform = require('../datatransform/directoryTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const directoryProxy = require('../../proxy/directoryProxy');

let directoryApi = new BaseInterface(directoryTranform,new BaseBusiness(directoryProxy));




exports.create = function* (next)
{
    return yield* directoryApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* directoryApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* directoryApi.update(this);
};

exports.list = function*(next)
{
    return yield* directoryApi.list(this);

  /*  this.status = 200;
    let callback = this.query.callback;
    let obj = {
        "href": "http://192.168.7.6:8070/api/v1.0.0/directorys/e4ZlzHOrd9O4ckZvSV8GkA",
        "merchant": {
            "href": "http://localhost:5006/api/v1.0.0/merchants/zQZNqVpEbFxyZ7ayW7x2yA"
        },
        "name": "lisixxx",
        "status": "enabled",
        "description": "data",
        "createdAt": "2018-03-06 11:33:21",
        "modifiedAt": "2018-03-06 11:33:21"
    };
    this.body = callback +'(' + JSON.stringify(obj) + ')';*/


};

exports.delete = function*(next)
{
    return yield* directoryApi.delete(this);
};

