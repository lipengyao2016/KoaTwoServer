/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class DirectoryTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'name':'string',
            'merchantHref':'string',
            'merchantUUID':'string',
            'status':'string',
            'description':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'enabled',
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.merchantHref)
        {
            body.merchantUUID = utils.getResourceUUIDInURL(body.merchantHref,'merchants');
        }

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
        return qs;
    };


    *parsePath(context)
    {
        let { directoryUUID } = context.params;
        return directoryUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateDirectorysRetJSON(res);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListDirectorysRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new DirectoryTranform();