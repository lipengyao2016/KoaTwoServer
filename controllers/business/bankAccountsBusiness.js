/**
 * Created by Administrator on 2016/12/14.
 */
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const returnResources = require('../returnResources');
const _ = require('lodash');
const request = require('commonutils').request.request;
const resourceURI = require('../resourceURI');
const URIParser = resourceURI.v1;

class BankAccountsBusiness extends BaseBusiness {
    constructor(dataProxyer) {
        console.log('BankAccountsBusiness->constructor dataProxyer:' + dataProxyer);
        super(dataProxyer);
    };

    *recharge(context)
    {
        let { bankAccountUUID } = context.params;
        let data = yield* this.dataProxyer.recharge(bankAccountUUID,context.request.body.rechargeAmount);
        return data;
    };

    *paymentCard(context)
    {
        let { bankAccountUUID } = context.params;
        let data = yield* this.dataProxyer.paymentCard(bankAccountUUID,context.request.body.payAmount);
        return data;
    };

    *queryBalance(context)
    {
        let { bankAccountUUID } = context.params;
        let data = yield* this.dataProxyer.retrieve(bankAccountUUID);
        return data;
    };
}

module.exports = BankAccountsBusiness;