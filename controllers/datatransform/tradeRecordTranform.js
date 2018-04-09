/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class TradeRecordTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'bankAccountUUID':'string',
            'tradeType':'string',
            'tradeNo':'string',
            'tradeAmount':'float',
            'balanceAmount':'float',
            'tradeAt':'date',
            'operator':'string',
            'status':'string',
            'remark':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
            'operator':'system',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        let { bankAccountUUID } = context.params;
        body.bankAccountUUID = bankAccountUUID;

        let tradeRecords= {};
        this.parseDataFromBody(tradeRecords,this.dataType,this.defDataObj,body,bCreated);
        return tradeRecords;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);

        let { bankAccountUUID } = context.params;
        qs.bankAccountUUID = bankAccountUUID;

        return qs;
    };


    *parsePath(context)
    {
        let { tradeRecordUUID } = context.params;
        return tradeRecordUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateTradeRecordsRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        let { bankAccountUUID } = context.params;
        return returnResources.generateListTradeRecordsRetJSON(bankAccountUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new TradeRecordTranform();


