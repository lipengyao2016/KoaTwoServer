const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;

const {accountsDB} = require('../models/tables');
const _ = require('lodash');

const DBObjConvert = require('ComponetFramework').DBObjConver;
let dbObjConv = new DBObjConvert();

let dateKeys = ['createdAt','modifiedAt','openAccountAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['name','password'],
    inKeys:['id','uuid','memberCardUUID','memberCardHref','status'],
    DateKeys:dateKeys,
});


class  SignProxy extends  Proxy
{
    constructor(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys)
    {
        super(table,convert2DBInfo, convert2LogicInfo, generateQueryCondition,dateKeys);
        this.knex = table.knex;
        this.name = table.name;
    };


    async sign(name,password)
    {
        let phoneArray = [];
        phoneArray.push('333');
        let data = await  this.list({name:'*' + name,createdAt:'[2017-8-12 00:00:00,]',/*phone:phoneArray*/});
        console.log('sign name:' + name);
       /* let retObj = {name};
        if(data.length > 0)
        {
            let dbPassword = data[0].password;
            if(_.isEqual(dbPassword,password))
            {
                retObj.loginStatus = 'ok';
            }
            else
            {
                retObj.loginStatus = 'incorrect password';
            }
        }
        else
        {
            retObj.loginStatus = 'not found';
        }

        return retObj;*/

       return data;
    }


}


module.exports = new SignProxy(accountsDB,dbObjConv.convert2DBInfo,dbObjConv.convert2LogicInfo,generateQueryCondition,dateKeys);

