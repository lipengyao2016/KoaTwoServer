"use strict";
const config = require("../config/config");
const knex = require('../models/knex').knex;
const chai = require('chai');
const expect = chai.expect;
const moment = require('moment');
const utils = require('common-data-utils').utils;

const resourceURI = require('../controllers/resourceURI');
const URIParser = resourceURI.v1;

var initialMysqlTestData = () => {

    let curDate = utils.convertDateTime(new Date());
    let tenantUUID = '94JveWHViaT3frKuutKh7w';
    let applicationHref ='http://' + config.externalServer_domain+ ':5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA';

    let ptOperatorMerchantUrl = 'http://' + config.externalServer_domain+ ':5006/api/v1.0.0/merchants/aR5Uj5qbZw7yjiP0zDqmyQ';

    let ptProductUrl = 'http://' + config.externalServer_domain+ ':5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/KvtQ5Bs3ThNOOMPKDwe9vQ/products/YjbyqDS3KaDybB8TnIwlYg';

    let terminalPathUrl = 'http://' + config.externalServer_domain+ ':5024/api/v1.0.0/tenants/0VnRpHOEcPpN1CICQ5yTOw' +
        '/deviceDirectorys/JfnBhZS9oLKoDFKHTxEmlw/terminals/';

    let departPathUrl = 'http://' + config.externalServer_domain+ ':5003/api/v1.0.0/userOrganizations/eCyasd3xUf0ks6X7FVd4cA/departments/';



    let carDirectoryUUID = 'm5FWnZxCXgjIFlAdqR8euQ';
    let carOwnerUUID = '5MsefsVs0jB6sAeYSYtkKg';
    let yicarOwnerUUID = 'iIxaakNe2hS1uAn0NmGqyg';

    let carUUID='jvLBieqP7SUOEwvmfiPs9g';
    let yicarUUID='OWbuGXRmqKR8GIdDiZVKVA';
    let rootGroupId = 'rRSTN0SRqXs2Luj5Mw9gtA';
    let secondGroupId = 'qGTGPBdCX2wpg1WT8hkXCw';
    let threeGroupId = 'A624wgpN2ZTjIkXgGsWavg';

    let secondCarUUID = '2KrBqjMogVWM9YK6gNpCUg';


    return knex.transaction( trx => {
        return knex('package').delete().transacting(trx)
            .then(()=>{
                return knex('packageDirectory').delete().transacting(trx);
            })
            .then(()=>{
                return knex('tenant').delete().transacting(trx);
            })
            .then(function () {
                return knex('tenant').insert({
                    'uuid': tenantUUID,
                    'name': '支撑系统租户',
                    'description': '此租户管理当前系统下所有的资源。',
                    'status': 'enabled',
                    'applicationURL': applicationHref,
                    'createdAt': curDate,
                    'modifiedAt': curDate
                }).transacting(trx);
            })
            .then(function () {
                console.log('database initial finish.');
                return trx.commit();
            })
            .catch(function (error) {
                console.log(error);
                trx.rollback();
                throw new Error("The DBForTestCases initial failed.");
            });
    });
};


describe('initial test cases',  function() {
    it('it should initial success',  function() {
        this.timeout(0);
        if(!config.knex_client || !config.knex_connection || !config.knex_connection.database) {
            console.log('database config is error.' );
            return;
        }
        return initialMysqlTestData().then( () => {
            console.log("initial database success.");
            return Promise.resolve();
        });
    });
});