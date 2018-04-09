/**
 * Created by Administrator on 2016/12/12.
 */

const memberCardTranform = require('../datatransform/memberCardTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const memberCardBusiness = require('../business/memberCardBusiness');
const MemberCardsInterface = require('../interface/memberCardsInterface');


let memberCardApi = new MemberCardsInterface(memberCardTranform,memberCardBusiness);



exports.create = function* (next)
{
    return yield* memberCardApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* memberCardApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* memberCardApi.update(this);
};

exports.list = function*(next)
{
    return yield* memberCardApi.list(this);
};

exports.delete = function*(next)
{
    return yield* memberCardApi.delete(this);
};

exports.verifyPassword = function*(next)
{
    return yield* memberCardApi.verifyPassword(this);
};