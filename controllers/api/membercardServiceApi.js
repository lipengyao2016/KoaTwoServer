/**
 * Created by Administrator on 2016/12/12.
 */

const memberCardServiceTranform = require('../datatransform/memberCardServiceTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const memberCardServiceProxy = require('../../proxy/memberCardServiceProxy');

let memberCardServiceApi = new BaseInterface(memberCardServiceTranform,new BaseBusiness(memberCardServiceProxy));



exports.create = function* (next)
{
    return yield* memberCardServiceApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* memberCardServiceApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* memberCardServiceApi.update(this);
};

exports.list = function*(next)
{
    return yield* memberCardServiceApi.list(this);
};

exports.delete = function*(next)
{
    return yield* memberCardServiceApi.delete(this);
};

