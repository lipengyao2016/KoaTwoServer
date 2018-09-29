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

describe('memberCardService Test Case:', () => {

    let memberCardServiceTestCase = {
        'serviceHref': 'http://localhost:8070/api/v1.0.0/services/taoyTmQpw4FE5Of4Xljf8Q',
        'serviceName': '洗车qq',
        'buyServiceValue': 55,
        'serviceType': 'count',
        'source': 'http://localhost:8070/api/v1.0.0/order/caoyTmQpw4FE5Of4Xljf8Q'
    };

    let memberCardUUID = null;
    let directUrl = null;

    let memberCardServiceUUID = null;

    directUrl = url + '/directorys/' + 'bvnD1NAHd1NgDZOnGQZR6w';
    let memberURL = directUrl + '/memberCards/' + '4UuJ2bAXwAqjg8EMgsWL2g';

    describe('create test case:', function () {
        it('success create an memberCardService', function () {
            this.timeout(0);
            return request.postRequest(`${memberURL}/memberCardServices`, memberCardServiceTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('memberCardService test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                memberCardServiceUUID = utils.getResourceUUIDInURL(body.href, 'memberCardServices');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an memberCardService  ', function () {
            this.timeout(0);
            return request.getRequest(`${memberURL}/memberCardServices/${memberCardServiceUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('memberCardService test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an memberCardService', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.serviceName = '洗衣服';
            return request.postRequest(`${memberURL}/memberCardServices/${memberCardServiceUUID}`, updateInfo).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('memberCardService test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list memberCardServices by memberCard:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
                beginAt: '[,2018-3-6]'
            };
            return request.getRequest(`${memberURL}/memberCardServices`, qs).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('memberCardService test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an memberCardService', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/memberCardServices/${memberCardServiceUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});