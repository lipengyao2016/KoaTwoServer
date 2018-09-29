/**
 * Created by Administrator on 2016/12/14.
 */
const BaseBusiness = require('componet-data-framework').BaseBusiness;
const returnResources = require('../returnResources');
const _ = require('lodash');
const request = require('common-data-utils').request.request;
const resourceURI = require('../resourceURI');
const URIParser = resourceURI.v1;

class AccountsBusiness extends BaseBusiness {
    constructor(dataProxyer) {
        console.log('AccountsBusiness->constructor dataProxyer:' + dataProxyer);
        super(dataProxyer);
    };


    async resetPwd(context)
    {
        let accountUUID = context.params['accountUUID'];
        return await  this.dataProxyer.resetPwd(accountUUID,context.query.password);
    }

    async countByUserId(context)
    {

        return await  this.dataProxyer.countByUserId();
    }

}

module.exports =  {
    resource:'account',
    resourceClass:AccountsBusiness,
};