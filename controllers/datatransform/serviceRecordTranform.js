/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class ServiceRecordTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'memberCardUUID':'string',
            'serviceUUID':'string',
            'recordType':'string',
            'tradeValue':'int',
            'leftValue':'int',
            'recordAt':'date',
            'operator':'string',
            'recordSource':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'operator':'system',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        let { memberCardUUID, memberCardServiceUUID} = context.params;
        body.memberCardUUID = memberCardUUID;
        body.serviceUUID = memberCardServiceUUID;

        let operatorRecord= {};
        this.parseDataFromBody(operatorRecord,this.dataType,this.defDataObj,body,bCreated);

        return operatorRecord;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { memberCardUUID, memberCardServiceUUID } = context.params;
        qs.memberCardUUID = memberCardUUID;
        qs.serviceUUID = memberCardServiceUUID;
        return qs;
    };


    *parsePath(context)
    {
        let { serviceRecordUUID } = context.params;
        return serviceRecordUUID;
    };


    *geneRetJson(res,context)
    {
        let { directoryUUID} = context.params;
        return returnResources.generateServiceRecordsRetJSON(directoryUUID,res);
    };

    *geneListRetJson(retList,count,context)
    {
        let { directoryUUID, memberCardUUID,memberCardServiceUUID} = context.params;
        return returnResources.generateListServiceRecordsRetJSON(directoryUUID,memberCardUUID,memberCardServiceUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new ServiceRecordTranform();


