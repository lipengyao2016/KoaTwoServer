/**
 * Created by Administrator on 2016/12/12.
 */

const discountRecordTranform = require('../datatransform/discountRecordTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const discountRecordsProxy = require('../../proxy/discountRecordsProxy');

let discountRecordApi = new BaseInterface(discountRecordTranform,new BaseBusiness(discountRecordsProxy));



exports.create = function* (next)
{
    return yield* discountRecordApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* discountRecordApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* discountRecordApi.update(this);
};

exports.list = function*(next)
{
    return yield* discountRecordApi.list(this);
};

exports.delete = function*(next)
{
    return yield* discountRecordApi.delete(this);
};

