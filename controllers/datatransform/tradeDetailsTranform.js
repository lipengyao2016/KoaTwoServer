/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class TradeDetailsTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'objectUUID':'string',
            'tradeType':'string',
            'tradeSource':'string',
            'tradeNo':'string',
            'tradeAmount':'float',
            'status':'string',
            'remark':'string',
            'tradeAt':'date',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'unpayed',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;



        let { tradeObjectUUID } = context.params;
        body.objectUUID = tradeObjectUUID;

        let tradeDetails= {};
        this.parseDataFromBody(tradeDetails,this.dataType,this.defDataObj,body,bCreated);
        return tradeDetails;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { tradeObjectUUID } = context.params;
        qs.objectUUID = tradeObjectUUID;
        return qs;
    };


    *parsePath(context)
    {
        let { tradeDetailUUID } = context.params;
        return tradeDetailUUID;
    };


    *geneRetJson(res,context)
    {
        let { tradeOrderUUID,tradeObjectUUID } = context.params;
        return returnResources.generateTradeDetailsRetJSON(tradeOrderUUID,res);
    };

    *geneListRetJson(retList,count,context)
    {
        let { tradeOrderUUID,tradeObjectUUID } = context.params;
        return returnResources.generateListTradeDetailsRetJSON( tradeOrderUUID,tradeObjectUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new TradeDetailsTranform();


