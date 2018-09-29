"use strict";
const moment = require('moment');
const utils = require('common-data-utils').utils;
const  proxyCommon = require('componet-data-framework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const DBObjConvert = require('componet-data-framework').DBObjConver;
let dbObjConv = new DBObjConvert();
const proxyRedis = require('./proxyRedis');

const knex = require('../models/knex').knex;
const config = require('../config/config');
const Table = require('componet-data-framework').tables.baseTable;


const generateQueryCondition = proxyCommon.querySQLGenerator({
});


function getBaseProxy(table,generateQueryCondition,bRedis = false,convert2DBInfo = dbObjConv.convert2DBInfo
                      ,convert2LogicInfo = dbObjConv.convert2LogicInfo,dateKeys = []) {


    if(!convert2DBInfo)
    {
        convert2DBInfo = dbObjConv.convert2DBInfo;
    }

    if(!convert2LogicInfo)
    {
        convert2LogicInfo = dbObjConv.convert2LogicInfo;
    }

    let basesProxy = new Proxy(table,convert2DBInfo,convert2LogicInfo,generateQueryCondition,dateKeys);
    if(bRedis)
    {
        proxyRedis.setProxyFuncCacheAble(basesProxy,table.name + 'Proxy');
    }

    return basesProxy;
}

function  getSimpleProxy(tableName,ProxyClass) {

    let dbTable = new Table(tableName,knex);

    let basesProxy = new ProxyClass(dbTable,dbObjConv.convert2DBInfo,dbObjConv.convert2LogicInfo,generateQueryCondition);
    return basesProxy;
}

exports.getBaseProxy = getBaseProxy;

exports.getSimpleProxy = getSimpleProxy;


