/**
 * Created by Administrator on 2016/12/12.
 */

const tradeObjectsTranform = require('../datatransform/tradeObjectsTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const tradeObjectsProxy = require('../../proxy/tradeObjectsProxy');

let tradeObjectsApi = new BaseInterface(tradeObjectsTranform,new BaseBusiness(tradeObjectsProxy));



exports.create = function* (next)
{
    return yield* tradeObjectsApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* tradeObjectsApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* tradeObjectsApi.update(this);
};

exports.list = function*(next)
{
    return yield* tradeObjectsApi.list(this);
};

exports.delete = function*(next)
{
    return yield* tradeObjectsApi.delete(this);
};

