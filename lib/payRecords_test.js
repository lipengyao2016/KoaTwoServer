'use strict';

/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');

describe('payRecord Test Case:', () => {

    let payRecordTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'memberCardHref': 'http://localhost:8070/api/v1.0.0/directorys/KuznH7NdKYPqpjl0NMamYg/members/hzE1MOJglzpcYeZxJDpkQA/memberCards/KylSFjoq7z3sDwE3ch2YmQ',
        'settleAmount': 50.0,
        'orderHref': 'http://localhost:8070/api/v1.0.0/order/daoyTmQpw4FE5Of4Xljf8Q',
        'settleType': 'income',
        'settleSource': 'http://localhost:8070/api/v1.0.0/bankAccounts/m5h6kAivoDa1EHPnJFFK5w',
        'payNo': '201547112',
        'payAt': '2017-5-8'
    };

    let directoryUUID = null;
    let directUrl = null;

    let payRecordUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an payRecord', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/payRecords`, payRecordTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('payRecord test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                payRecordUUID = utils.getResourceUUIDInURL(body.href, 'payRecords');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an payRecord  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/payRecords/${payRecordUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('payRecord test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an payRecord', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.accountId = '300012';
            return request.postRequest(`${directUrl}/payRecords/${payRecordUUID}`, updateInfo).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('payRecord test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list payRecords by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/payRecords`, qs).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('payRecord test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an payRecord', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/payRecords/${payRecordUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});