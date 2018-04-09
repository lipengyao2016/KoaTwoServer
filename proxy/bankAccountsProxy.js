/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {bankAccountsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');
const co = require('co');
const DBObjConvert = require('ComponetFramework').DBObjConver;
let dbObjConv = new DBObjConvert();


let dateKeys = ['createdAt','modifiedAt','openAccountAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['balanceAmount','password'],
    inKeys:['id','uuid','memberCardUUID','memberCardHref','status'],
    DateKeys:dateKeys,
});


class  BankAccountsProxy extends  Proxy
{
    constructor(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys)
    {
        super(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys);
        this.knex = table.knex;
        this.name = table.name;
    };


    *recharge(uuid,amount)
    {
       return yield* this.exclusiveUpdate(uuid,'balanceAmount',amount,true);
    }

    *paymentCard(uuid,amount)
    {
        return yield* this.exclusiveUpdate(uuid,'balanceAmount',amount,false);
    }

}



module.exports = new BankAccountsProxy(bankAccountsDB,dbObjConv.convert2DBInfo,dbObjConv.convert2LogicInfo
    ,generateQueryCondition,dateKeys);

