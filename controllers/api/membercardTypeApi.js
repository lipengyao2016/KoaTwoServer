/**
 * Created by Administrator on 2016/12/12.
 */

const memberCardTypeTranform = require('../datatransform/memberCardTypeTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const memberCardTypeProxy = require('../../proxy/memberCardTypeProxy');

let memberCardTypeApi = new BaseInterface(memberCardTypeTranform,new BaseBusiness(memberCardTypeProxy));


exports.create = function* (next)
{
    return yield* memberCardTypeApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* memberCardTypeApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* memberCardTypeApi.update(this);
};

exports.list = function*(next)
{
    return yield* memberCardTypeApi.list(this);
};

exports.delete = function*(next)
{
    return yield* memberCardTypeApi.delete(this);
};

