/**
 * Created by Administrator on 2016/12/12.
 */

const tradeDetailsTranform = require('../datatransform/tradeDetailsTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const tradeDetailsProxy = require('../../proxy/tradeDetailsProxy');

let tradeDetailsApi = new BaseInterface(tradeDetailsTranform,new BaseBusiness(tradeDetailsProxy));



exports.create = function* (next)
{
    return yield* tradeDetailsApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* tradeDetailsApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* tradeDetailsApi.update(this);
};

exports.list = function*(next)
{
    return yield* tradeDetailsApi.list(this);
};

exports.delete = function*(next)
{
    return yield* tradeDetailsApi.delete(this);
};

