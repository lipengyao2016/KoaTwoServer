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

describe('tradeOrder Test Case:', () => {

    let tradeOrderTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'sellOrderHref': 'http://localhost:8070/api/v1.0.0/directorys/KuznH7NdKYPqpjl0NMamYg/orders/cylSFjoq7z3sDwE3ch2YmQ',
        'merberCardHref': 'http://localhost:8070/api/v1.0.0/directorys/KuznH7NdKYPqpjl0NMamYg/members/hzE1MOJglzpcYeZxJDpkQA/memberCards/KylSFjoq7z3sDwE3ch2YmQ',
        'isUseMemberCard': 1,
        'tradeNumber': '201708010002',
        'tradeAmount': 50.2,
        'tradeAt': '2017-8-1',
        'tradeAddress': '南山'
    };

    let directoryUUID = null;
    let directUrl = null;

    let tradeOrderUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an tradeOrder', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/tradeOrders`, tradeOrderTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('tradeOrder test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                tradeOrderUUID = utils.getResourceUUIDInURL(body.href, 'tradeOrders');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an tradeOrder  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/tradeOrders/${tradeOrderUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('tradeOrder test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an tradeOrder', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.tradeAddress = '南山比';
            return request.postRequest(`${directUrl}/tradeOrders/${tradeOrderUUID}`, updateInfo).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('tradeOrder test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list tradeOrders by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/tradeOrders`, qs).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('tradeOrder test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an tradeOrder', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/tradeOrders/${tradeOrderUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});