/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('common-data-utils').utils;

const  proxyCommon = require('componet-data-framework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {bankAccountsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');
const co = require('co');
const DBObjConvert = require('componet-data-framework').DBObjConver;
let dbObjConv = new DBObjConvert();


let dateKeys = ['createdAt','modifiedAt','openAccountAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['balanceAmount','password'],
    inKeys:['id','uuid','memberCardUUID','memberCardHref','status'],
    DateKeys:dateKeys,
});


class  AccountsProxy extends  Proxy
{
    constructor(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys)
    {
        super(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys);
        this.knex = table.knex;
        this.name = table.name;
    };


    async resetPwd(uuid,password)
    {
        let data = {uuid,password};
        return await  this.update(data);
    }


    async countByUserId()
    {
        return this.knex( this.name ).select(this.knex.raw('userId')).count('id as count')
            .groupBy('userId');
    }

}



module.exports = {
    resource:'account',
    resourceClass:AccountsProxy,
};

