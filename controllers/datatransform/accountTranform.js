/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('componet-data-framework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('common-data-utils').utils;
const _ = require('lodash');
const crypto = require('crypto');

class AccountTranform extends  BaseDataTranform {
    constructor(tableName)
    {
        super(tableName);
    };


    encryptPwdMd5 (uuid, pwd) {
        let md5 = crypto.createHash('md5');
        let pwd_md5 = md5.update(`${uuid}-${pwd}-oa@8APi28#Eb9*V6/y&4r8`).digest('base64');
        return pwd_md5.substr(0, pwd_md5.length-2);
    };

    async parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.password)
        {
            body.password =  this.encryptPwdMd5(body.phone,body.password);
        }

        return body;
    };


    async geneRetJson(res,context)
    {
        delete  res.password;
        return super.geneRetJson(res,context);
    };

    async geneListRetJson(retList,count,context,query)
    {
        retList.map(retItem=>{
            delete  retItem.password;
        })
       return super.geneListRetJson(retList,count,context,query);
    };

   /* async parseBatchBody(context,bCreated =false)
    {
        return super.parseBatchBody(context,bCreated);
    };


    async parseQs(context)
    {
        return super.parseQs(context);
    };


    async parsePath(context)
    {
        return super.parsePath(context);
    };




   */

}

module.exports ={
    resource:'account',
    resourceClass:AccountTranform,
};





