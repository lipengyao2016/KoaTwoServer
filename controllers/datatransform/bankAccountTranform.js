/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');

class BankAccountTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'memberCardUUID':'string',
            'memberCardHref':'string',
            'balanceAmount':'float',
            'openAccountAt':'date',
            'status':'string',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'normal',
            'openAccountAt':utils.getTimeStr(new Date(),true),
        };
    };


    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        delete  body.balanceAmount;

        if(!bCreated)
        {
            delete  body.password;
        }
        else
        {
           /* if(!body.accountId)
            {
                body.accountId = '622' + utils.MakeRandomNumber(10);
                console.log('create bankAccount:',body.accountId);
            }*/

        }

        if(body.memberCardHref)
        {
            body.memberCardUUID = utils.getResourceUUIDInURL2(body.memberCardHref);
        }

        let bankAccounts= {};
        this.parseDataFromBody(bankAccounts,this.dataType,this.defDataObj,body,bCreated);
        return bankAccounts;
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
        let { bankAccountUUID } = context.params;
        return bankAccountUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generateBankAccountsRetJSON(res);
    };

    *geneHasBalanceRetJson(res,context)
    {
        return returnResources.generateBankAccountsRetJSON(res,true);
    };

    *geneListRetJson(retList,count,context)
    {
        return returnResources.generateListBankAccountsRetJSON(
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new BankAccountTranform();


