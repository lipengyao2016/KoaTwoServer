
const router = require('koa-router')();
const fs = require('fs');
const resourceConfig = require('../config/resourceConfig');
const restApi = require('./restApi');
const classMode = require('../classMode').classMode;

const BaseInterface = require('ComponetFramework').BaseInterface;
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const  proxyCommon = require('ComponetFramework').proxy_common;
const CommonProxy =proxyCommon.Proxy;

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.delete(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        }
        else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addFileControllers(router,dir) {
    var files = fs.readdirSync( dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require( dir + '/' + f);
        addMapping(router, mapping);
    }
}


function searchCustomerObjs(dir,baseClass) {

    var files = fs.readdirSync( dir);

    let customerObj = {};

    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process : ${f}...`);
        let classObj = require( dir + '/' + f);

        if(classObj.hasOwnProperty('resource') )
        {
            if( baseClass.isPrototypeOf(classObj.resourceClass))
            {
                console.log('searchCustomerObjs resource:' + classObj.resource + ',f:' + f);
                customerObj[classObj.resource] = classObj.resourceClass;
            }

        }
    }

    return customerObj;
}


function addResourceControllers(router,resourceMap,customerMap) {

     resourceMap.map(resourceItem=>{
         console.log(`process controller: ${resourceItem.resource}...`);
         let mapping = restApi.getRestApi(resourceItem,customerMap);
         addMapping(router, mapping);
     });
}


module.exports = function (rootDir) {
    let api_dir = rootDir || 'apis', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();

    let controllerDir = 'controllers';
    addFileControllers(router, api_dir + '/apis');

    let customerMaps = {};


    customerMaps[classMode.DataTransform] = searchCustomerObjs(api_dir + '/' + controllerDir + '/datatransform',BaseDataTranform);
    customerMaps[classMode.Business] = searchCustomerObjs(api_dir + '/' + controllerDir + '/business',BaseBusiness);
    customerMaps[classMode.Interface]  = searchCustomerObjs(api_dir + '/' + controllerDir + '/interface',BaseInterface);
    customerMaps[classMode.Proxy]  = searchCustomerObjs(api_dir  + '/proxy',CommonProxy);


    addResourceControllers(router,resourceConfig.resourceMap,customerMaps);
    return router.routes();
};