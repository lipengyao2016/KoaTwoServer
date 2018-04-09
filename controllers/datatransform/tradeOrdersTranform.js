/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class TradeOrdersTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'sellOrderHref':'string',
            'sellOrderUUID':'string',
            'merberCardHref':'string',
            'merberCardUUID':'string',
            'isUseMemberCard':'int',
            'tradeNumber':'string',
            'tradeAmount':'float',
            'tradeAt':'date',
            'tradeAddress':'string',
            'operator':'string',
            'status':'string',
            'remark':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'unpayed',
            'operator':'system',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.sellOrderHref)
        {
            body.sellOrderUUID = utils.getResourceUUIDInURL2(body.sellOrderHref);
        }

        if(body.merberCardHref)
        {
            body.merberCardUUID = utils.getResourceUUIDInURL2(body.merberCardHref);
        }

        let tradeOrder= {};
        this.parseDataFromBody(tradeOrder,this.dataType,this.defDataObj,body,bCreated);
        return tradeOrder;
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
        let { tradeOrderUUID } = context.params;
        return tradeOrderUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateTradeOrdersRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListTradeOrdersRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new TradeOrdersTranform();


