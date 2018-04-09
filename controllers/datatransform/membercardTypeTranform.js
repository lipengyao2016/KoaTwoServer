/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class memberCardTypeTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'name':'string',
            'intergateRadio':'float',
            'discountRadio':'float',
            'consumerAmountLimit':'int',
            'cardTypeNo':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            //'consumerAmountLimit':500,
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;
        let memberCardType= {};
        this.parseDataFromBody(memberCardType,this.dataType,this.defDataObj,body,bCreated);
        return memberCardType;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        return qs;
    };


    *parsePath(context)
    {
        let { memberCardTypeUUID } = context.params;
        return memberCardTypeUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generatememberCardTypesRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListmemberCardTypesRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };

   /* geneListByTenantRetJson(retList,count,context)
    {
        let {tenantUUID} = context.params;
        return returnResources.generateListPackageByTenantsRetJSON(tenantUUID,
            retList,context.query.offset
            ,count,context.query);
    };

    //批量创建套餐。
    geneBatchRetJson(res,context,bCreated =false)
    {
        let {tenantUUID,packageDirectoryUUID} = context.params;
        return returnResources.generateBatchPackagesRetJSON(tenantUUID,packageDirectoryUUID,res,bCreated);
    };

    //根据批次号查找套餐列表。
    geneListByBatchRetJson(retList,count,context)
    {
        let {tenantUUID,packageDirectoryUUID,packageBatchUUID} = context.params;
        return returnResources.generatePackagesByBatchNORetJSON(tenantUUID,packageDirectoryUUID,packageBatchUUID,retList);
    };*/


}

module.exports = new memberCardTypeTranform();