/**
 * Created by Administrator on 2017/2/23.
 */

const config = require('../config/config');
const apiCache = require('commonutils').cacheAble;
var package = require('../package.json');
var key_prefix = package.name?package.name:'';
var redis = require('../common/redis');

exports.setFuncCacheAble = function(obj,objName,funcNameList,time) {

    objName = key_prefix+':'+ objName;
    if(config.cache.open){
        if(funcNameList && funcNameList.length > 0)
        {
            funcNameList.map(funcName=>{
                apiCache.cacheable(obj,objName,funcName, time,redis);
            })
        }
    }
};


exports.setFuncClearCache = function(obj,objNameList,funcNameList) {

    let objKeyList = objNameList.map(objName=>(key_prefix+':'+ objName));
    if(config.cache.open){
        if(funcNameList && funcNameList.length > 0)
        {
            funcNameList.map(funcName=>{
                apiCache.clear(obj,objKeyList,funcName,redis);
            })
        }
    }
};


exports.setProxyFuncCacheAble = function(obj,objName) {

    let funcNameList = ['list','listAll','getCount','retrieve'];
    this.setFuncCacheAble(obj,objName,funcNameList,config.cache.time);

    let clearfuncNameList = ['create','batchCreate','batchUpdate','batchDelete','update','delete'];
    let objNameList=[];
    objNameList.push(objName);
    this.setFuncClearCache(obj,objNameList,clearfuncNameList);
};