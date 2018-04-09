/**
 * Created by Administrator on 2016/12/12.
 */

const bankAccountTranform = require('../datatransform/bankAccountTranform');
const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const bankAccountsProxy = require('../../proxy/bankAccountsProxy');
const BankAccountsBusiness = require('../business/bankAccountsBusiness');
const BankAccountsInterface = require('../interface/bankAccountsInterface');

let bankAccountApi = new BankAccountsInterface(bankAccountTranform,new BankAccountsBusiness(bankAccountsProxy));



exports.create = function* (next)
{
    return yield* bankAccountApi.create(this);
};

exports.retrieve = function*(next)
{
    return yield* bankAccountApi.retrieve(this);
};

exports.update = function*(next)
{
    return yield* bankAccountApi.update(this);
};

exports.list = function*(next)
{
    return yield* bankAccountApi.list(this);
};

exports.delete = function*(next)
{
    return yield* bankAccountApi.delete(this);
};

exports.recharge = function*(next)
{
    return yield* bankAccountApi.recharge(this);
};

exports.paymentCard = function*(next)
{
    return yield* bankAccountApi.paymentCard(this);
};

exports.queryBalance = function*(next)
{
    return yield* bankAccountApi.queryBalance(this);
};