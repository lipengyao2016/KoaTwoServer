/**
 * Created by Administrator on 2016/12/12.
 */

const payRecordTranform = require('../datatransform/payRecordTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const payRecordsProxy = require('../../proxy/payRecordsProxy');

let payRecordApi = new BaseInterface(payRecordTranform,new BaseBusiness(payRecordsProxy));



exports.create = function* (next)
{
    return yield* payRecordApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* payRecordApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* payRecordApi.update(this);
};

exports.list = function*(next)
{
    return yield* payRecordApi.list(this);
};

exports.delete = function*(next)
{
    return yield* payRecordApi.delete(this);
};

