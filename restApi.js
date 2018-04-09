const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const baseProxy = require('./proxy/baseProxy');
//const {accountsDB} = require('../models/tables');


/*let resource = 'account';
let table = 'accounts';*/

//let accountApi = new BaseInterface(new BaseDataTranform(tableName),new BaseBusiness(baseProxy.getSimpleProxy(accountsDB)));


var createApi = function (busiApi) {
   return async (ctx, next) => {
         return await  busiApi.create(ctx);
    };
}

var getApi = function (busiApi) {
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
}

function makeRestfulApi(name,busiApi) {

    let fushuName = name + 's';
    let nameUUID = name + 'UUID';
    let listURL = '/' + fushuName;
    let recordURL = listURL + '/:' + nameUUID;

    let restObj = {};
    restObj['POST /api/v1' + listURL] = createApi(busiApi);
    restObj['GET /api/v1' + listURL] = listApi(busiApi);
    restObj['GET /api/v1' + recordURL] = getApi(busiApi);
    restObj['POST /api/v1' + recordURL] = updateApi(busiApi);
    restObj['DELETE /api/v1' + recordURL] = deleteApi(busiApi);

    return restObj;
}

function getRestApi(resourceName,tableName) {

    let accountApi = new BaseInterface(new BaseDataTranform(resourceName),new BaseBusiness(baseProxy.getSimpleProxy(tableName)));
    return makeRestfulApi(resourceName,accountApi);
}


//module.exports = getRestApi(resource,table);

exports.getRestApi = getRestApi;

/*{
    'POST /accounts': createApi(accountApi),
    'GET /accounts': listApi(accountApi),
    'GET /accounts/:accountUUID': getApi(accountApi),
    'POST /accounts/:accountUUID': updateApi(accountApi),
    'DELETE /accounts/:accountUUID': deleteApi(accountApi),
};*/
