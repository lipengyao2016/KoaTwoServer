/**
 * Created by Administrator on 2016/12/12.
 */

const tradeOrdersTranform = require('../datatransform/tradeOrdersTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const tradeOrdersProxy = require('../../proxy/tradeOrdersProxy');

let tradeOrdersApi = new BaseInterface(tradeOrdersTranform,new BaseBusiness(tradeOrdersProxy));



exports.create = function* (next)
{
    return yield* tradeOrdersApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* tradeOrdersApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* tradeOrdersApi.update(this);
};

exports.list = function*(next)
{
    return yield* tradeOrdersApi.list(this);
};

exports.delete = function*(next)
{
    return yield* tradeOrdersApi.delete(this);
};

