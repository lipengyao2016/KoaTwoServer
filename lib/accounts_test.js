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

describe('account Test Case:', () => {

    let accountTestCase = {
        "name": "liufei66",
        "password": "3456789",
        "email": "wetwffdsf@qq.com",
        "phone": "13410983543",
        "userId": 562
    };

    let directoryUUID = null;
    let directUrl = null;

    let accountUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an account', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/accounts`, accountTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('account test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                accountUUID = body.uuid;
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an account  ', function () {
            this.timeout(0);
            accountUUID = '0xwUtoC6ljoAiqIctOJxRg';
            return request.getRequest(`${directUrl}/accounts/${accountUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('account test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success resetPwd an account  ', function () {
            this.timeout(0);
            accountUUID = '0xwUtoC6ljoAiqIctOJxRg';
            return request.getRequest(`${directUrl}/accounts/${accountUUID}/resetPwd`, { password: '3333333' }).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('account test resetPwd   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success countByUserId an account  ', function () {
            this.timeout(0);

            return request.getRequest(`${directUrl}/countByUserId`).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('account test countByUserId   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an account', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.password = '888888';
            return request.postRequest(`${directUrl}/accounts/${accountUUID}`, updateInfo).then((_ref5) => {
                let res = _ref5.res,
                    body = _ref5.body;


                console.log('account test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list accounts by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
                name: 'zhouyu*'
                // createdAt:'[2018-04-07 16:38:39,2018-04-08 16:43:32]',
                //  password:['111','333'],
            };
            return request.getRequest(`${directUrl}/accounts`, qs).then((_ref6) => {
                let res = _ref6.res,
                    body = _ref6.body;


                console.log('account test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an account', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/accounts/${accountUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});