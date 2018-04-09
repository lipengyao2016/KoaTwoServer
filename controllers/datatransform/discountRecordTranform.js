/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class DiscountRecordTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'goodsHref':'string',
            'goodsUUID':'string',
            'memberCardHref':'string',
            'memberCardUUID':'string',
            'quatity':'int',
            'origionPrice':'float',
            'discountPrice':'float',
            'origionAmount':'float',
            'discountAmount':'float',
            'orderHref':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.goodsHref)
        {
            body.goodsUUID = utils.getResourceUUIDInURL2(body.goodsHref);
        }

        if(body.memberCardHref)
        {
            body.memberCardUUID = utils.getResourceUUIDInURL2(body.memberCardHref);
        }


        let discountRecord= {};
        this.parseDataFromBody(discountRecord,this.dataType,this.defDataObj,body,bCreated);
        return discountRecord;
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
        let { discountRecordUUID } = context.params;
        return discountRecordUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateDiscountRecordsRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListDiscountRecordsRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new DiscountRecordTranform();


