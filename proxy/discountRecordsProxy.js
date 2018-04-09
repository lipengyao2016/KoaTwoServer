/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {discountRecordsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['goodsHref','memberCardHref','quatity','origionPrice','discountPrice','origionAmount','discountAmount','orderHref'],
    inKeys:['id','uuid','goodsUUID','memberCardUUID'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(discountRecordsDB,generateQueryCondition,false,null,null,dateKeys);

