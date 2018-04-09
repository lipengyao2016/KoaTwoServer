/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class PayRecordTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'memberCardHref':'string',
            'memberCardUUID':'string',
            'settleAmount':'float',
            'orderUUID':'string',
            'orderHref':'string',
            'remark':'string',
            'status':'string',
            'settleType':'string',
            'settleSource':'string',
            'payNo':'string',
            'payAt':'date',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.memberCardHref)
        {
            body.memberCardUUID = utils.getResourceUUIDInURL2(body.memberCardHref);
        }

        if(body.orderHref)
        {
            body.orderUUID = utils.getResourceUUIDInURL2(body.orderHref);
        }


        let payRecords= {};
        this.parseDataFromBody(payRecords,this.dataType,this.defDataObj,body,bCreated);
        return payRecords;
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
        let { payRecordUUID } = context.params;
        return payRecordUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generatePayRecordsRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListPayRecordsRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new PayRecordTranform();


