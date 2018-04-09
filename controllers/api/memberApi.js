/**
 * Created by Administrator on 2016/12/12.
 */

const memberTranform = require('../datatransform/memberTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const membersProxy = require('../../proxy/membersProxy');

let memberApi = new BaseInterface(memberTranform,new BaseBusiness(membersProxy));



exports.create = function* (next)
{
    return yield* memberApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* memberApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* memberApi.update(this);
};

exports.list = function*(next)
{
    return yield* memberApi.list(this);
};

exports.delete = function*(next)
{
    return yield* memberApi.delete(this);
};

