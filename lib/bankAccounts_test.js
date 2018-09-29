'use strict';

/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('common-data-utils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');

describe('bankAccount Test Case:', () => {

    let bankAccountTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'memberCardHref': 'http://localhost:8070/api/v1.0.0/directorys/KuznH7NdKYPqpjl0NMamYg/memberCards/OQf0CGEnm8IWTGc3NbXM0w',
        // 'accountId':'21547',
        'balanceAmount': 5000.0,
        'openAccountAt': '2017-8-1'
        // 'password':'888888',
    };

    let directoryUUID = null;
    let directUrl = null;

    let bankAccountUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an bankAccount', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/bankAccounts`, bankAccountTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('bankAccount test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                bankAccountUUID = utils.getResourceUUIDInURL(body.href, 'bankAccounts');
            });
        });

        it('success recharge an bankAccount', function () {
            this.timeout(0);
            bankAccountUUID = 'FS4TkKrbKZLadk3tccOcqw';
            return request.postRequest(`${directUrl}/bankAccounts/${bankAccountUUID}/recharge`, { rechargeAmount: 50.2 }).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('bankAccount test recharge   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                bankAccountUUID = utils.getResourceUUIDInURL(body.href, 'bankAccounts');
            });
        });

        it('success paymentCard an bankAccount', function () {
            this.timeout(0);
            bankAccountUUID = 'FS4TkKrbKZLadk3tccOcqw';
            return request.postRequest(`${directUrl}/bankAccounts/${bankAccountUUID}/paymentCard`, { payAmount: 30.2 }).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('bankAccount test paymentCard   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                bankAccountUUID = utils.getResourceUUIDInURL(body.href, 'bankAccounts');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an bankAccount  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/bankAccounts/${bankAccountUUID}`).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('bankAccount test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success queryBalance an bankAccount', function () {
            this.timeout(0);
            bankAccountUUID = 'FS4TkKrbKZLadk3tccOcqw';
            return request.getRequest(`${directUrl}/bankAccounts/${bankAccountUUID}/queryBalance`).then((_ref5) => {
                let res = _ref5.res,
                    body = _ref5.body;


                console.log('bankAccount test paymentCard   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                bankAccountUUID = utils.getResourceUUIDInURL(body.href, 'bankAccounts');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an bankAccount', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.accountId = '300012';
            return request.postRequest(`${directUrl}/bankAccounts/${bankAccountUUID}`, updateInfo).then((_ref6) => {
                let res = _ref6.res,
                    body = _ref6.body;


                console.log('bankAccount test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list bankAccounts by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/bankAccounts`, qs).then((_ref7) => {
                let res = _ref7.res,
                    body = _ref7.body;


                console.log('bankAccount test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an bankAccount', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/bankAccounts/${bankAccountUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});