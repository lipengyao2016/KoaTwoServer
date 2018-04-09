/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {memberCardsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','beginAt','endAt','openCardAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['consumerAmount','phone','idCard','ownerHref'],
    inKeys:['id','uuid','cardNo','directoryUUID','status','cardTypeUUID','ownerUUID'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(memberCardsDB,generateQueryCondition,false,null,null,dateKeys);

