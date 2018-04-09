/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class MemberTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'name':'string',
            'idCard':'string',
            'directoryUUID':'string',
            'status':'string',
            'registerAt':'date',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        let { directoryUUID } = context.params;

        body.directoryUUID = directoryUUID;

        let directory= {};
        this.parseDataFromBody(directory,this.dataType,this.defDataObj,body,bCreated);

        return directory;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { directoryUUID } = context.params;
        if(directoryUUID)
        {
            qs.directoryUUID = directoryUUID;
        }

        return qs;
    };


    *parsePath(context)
    {
        let { memberUUID } = context.params;
        return memberUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateMembersRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        let { directoryUUID } = context.params;
        return returnResources.generateListMembersRetJSON(directoryUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new MemberTranform();