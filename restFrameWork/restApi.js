const BaseInterface = require('componet-data-framework').BaseInterface;
const BaseBusiness = require('componet-data-framework').BaseBusiness;
const BaseDataTranform = require('componet-data-framework').BaseDataTranform;
const  proxyCommon = require('componet-data-framework').proxy_common;
const CommonProxy =proxyCommon.Proxy;

const baseProxy = require('../proxy/baseProxy');
//const {accountsDB} = require('../models/tables');
const classMode = require('../classMode').classMode;

const _ = require('lodash');


/*let resource = 'account';
let table = 'accounts';*/

//let accountApi = new BaseInterface(new BaseDataTranform(tableName),new BaseBusiness(baseProxy.getSimpleProxy(accountsDB)));


var wrapBusiApi = function (busiApi,func) {
   return async (ctx, next) => {
         return await  func.call(busiApi,ctx);
    };
}

/*var getApi = function (busiApi) {
    return async (ctx, next) => {
        return await  busiApi.retrieve(ctx);
    };
}


var updateApi = function (busiApi) {
    return async (ctx, next) => {
        return await  busiApi.update(ctx);
    };
}


var listApi = function (busiApi) {
    return async (ctx, next) => {
        return await  busiApi.list(ctx);
    };
}

var deleteApi = function (busiApi) {
    return async (ctx, next) => {
        return await  busiApi.delete(ctx);
    };
}*/

function makeRestfulApi(name,busiApi,extendMap) {

    let fushuName = name + 's';
    let nameUUID = name + 'UUID';
    let apiVer = '/api/v1';
    let listURL = apiVer + '/' + fushuName;
    let recordURL = listURL + '/:' + nameUUID;

    let restObj = {};


    restObj['POST ' + listURL] = wrapBusiApi(busiApi,busiApi.create);
    restObj['GET ' + listURL] = wrapBusiApi(busiApi,busiApi.list);
    restObj['GET ' + recordURL] = wrapBusiApi(busiApi,busiApi.retrieve);
    restObj['POST ' + recordURL] = wrapBusiApi(busiApi,busiApi.update);
    restObj['DELETE ' + recordURL] = wrapBusiApi(busiApi,busiApi.delete);

    if(extendMap && _.isArray(extendMap))
    {
        extendMap.map(extendItem=>{
            let extendUrl = '';
            if(_.isEqual(extendItem.type,'object'))
            {
                extendUrl = recordURL + '/' + extendItem.name;
            }
            else
            {
                extendUrl = apiVer + '/' + extendItem.name;
            }

            restObj[extendItem.requestMethod + ' ' + extendUrl] =  wrapBusiApi(busiApi,busiApi[extendItem.interfaceMethod]);
        });
    }



    return restObj;
}

function getRestApi(resourceItem,customerMap) {

    let resourceName = resourceItem.resource;
    let tableName = resourceItem.table;

    let InterfaceClass = (customerMap[classMode.Interface])[resourceName]
        ?(customerMap[classMode.Interface])[resourceName] : BaseInterface;

    let DataTranformClass = (customerMap[classMode.DataTransform])[resourceName]
        ?(customerMap[classMode.DataTransform])[resourceName] : BaseDataTranform;

    let BusinessClass = (customerMap[classMode.Business])[resourceName]
        ?(customerMap[classMode.Business])[resourceName] : BaseBusiness;

    let ProxyClass = (customerMap[classMode.Proxy])[resourceName]
        ?(customerMap[classMode.Proxy])[resourceName] : CommonProxy;


    let accountApi = new InterfaceClass(new DataTranformClass(resourceName),new BusinessClass(baseProxy.getSimpleProxy(tableName,ProxyClass)));
    return makeRestfulApi(resourceName,accountApi,resourceItem.extend_api );
}


exports.getRestApi = getRestApi;

/*{
    'POST /accounts': createApi(accountApi),
    'GET /accounts': listApi(accountApi),
    'GET /accounts/:accountUUID': getApi(accountApi),
    'POST /accounts/:accountUUID': updateApi(accountApi),
    'DELETE /accounts/:accountUUID': deleteApi(accountApi),
};*/
