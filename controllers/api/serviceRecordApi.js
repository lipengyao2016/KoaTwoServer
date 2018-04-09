/**
 * Created by Administrator on 2016/12/12.
 */

const serviceRecordTranform = require('../datatransform/serviceRecordTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const serviceRecordsDBProxy = require('../../proxy/serviceRecordsDBProxy');

let serviceRecordApi = new BaseInterface(serviceRecordTranform,new BaseBusiness(serviceRecordsDBProxy));



exports.create = function* (next)
{
    return yield* serviceRecordApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* serviceRecordApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* serviceRecordApi.update(this);
};

exports.list = function*(next)
{
    return yield* serviceRecordApi.list(this);
};

exports.delete = function*(next)
{
    return yield* serviceRecordApi.delete(this);
};

