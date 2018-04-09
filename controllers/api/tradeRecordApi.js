/**
 * Created by Administrator on 2016/12/12.
 */

const tradeRecordTranform = require('../datatransform/tradeRecordTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const tradeRecordsProxy = require('../../proxy/tradeRecordsProxy');

let tradeRecordApi = new BaseInterface(tradeRecordTranform,new BaseBusiness(tradeRecordsProxy));



exports.create = function* (next)
{
    return yield* tradeRecordApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* tradeRecordApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* tradeRecordApi.update(this);
};

exports.list = function*(next)
{
    return yield* tradeRecordApi.list(this);
};

exports.delete = function*(next)
{
    return yield* tradeRecordApi.delete(this);
};

