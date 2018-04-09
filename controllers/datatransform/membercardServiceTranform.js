/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class memberCardServiceTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'memberCardUUID':'string',
            'serviceHref':'string',
            'serviceUUID':'string',
            'serviceName':'string',
            'serviceType':'string',
            'buyServiceValue':'int',
            'consumeredServiceValue':'int',
            'source':'string',
            'status':'string',
            'beginAt':'date',
            'endAt':'date',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        let { memberCardUUID } = context.params;
        body.memberCardUUID = memberCardUUID;

        if(body.serviceHref)
        {
            body.serviceUUID = utils.getResourceUUIDInURL2(body.serviceHref);
        }

        let merbercardService= {};
        this.parseDataFromBody(merbercardService,this.dataType,this.defDataObj,body,bCreated);

        return merbercardService;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { memberCardUUID } = context.params;
        qs.memberCardUUID = memberCardUUID;
        return qs;
    };


    *parsePath(context)
    {
        let { memberCardServiceUUID } = context.params;
        return memberCardServiceUUID;
    };


    *geneRetJson(res,context)
    {
        let { directoryUUID,memberCardUUID} = context.params;
        return returnResources.generatememberCardServicesRetJSON(directoryUUID,res);
    };

    *geneListRetJson(retList,count,context)
    {
        let { directoryUUID, memberCardUUID} = context.params;
        return returnResources.generateListmemberCardServicesRetJSON(directoryUUID,memberCardUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new memberCardServiceTranform();


