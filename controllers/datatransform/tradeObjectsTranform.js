/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class TradeObjectsTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'tradeOrderUUID':'string',
            'goodsHref':'string',
            'goodsUUID':'string',
            'quatity':'int',
            'orignAmount':'float',
            'tradeAmount':'float',
            'status':'string',
            'remark':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'unpayed',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.goodsHref)
        {
            body.goodsUUID = utils.getResourceUUIDInURL2(body.goodsHref);
        }

        let { tradeOrderUUID } = context.params;
        body.tradeOrderUUID = tradeOrderUUID;

        let tradeObjects= {};
        this.parseDataFromBody(tradeObjects,this.dataType,this.defDataObj,body,bCreated);
        return tradeObjects;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { tradeOrderUUID } = context.params;
        qs.tradeOrderUUID = tradeOrderUUID;
        return qs;
    };


    *parsePath(context)
    {
        let { tradeObjectUUID } = context.params;
        return tradeObjectUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateTradeObjectsRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListTradeObjectsRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new TradeObjectsTranform();


