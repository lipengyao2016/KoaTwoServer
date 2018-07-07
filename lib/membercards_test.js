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

describe('memberCard Test Case:', () => {

    let memberCardTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'memberCardTypeHref': 'http://localhost:8070/api/v1.0.0/memberCardTypes/OIiZx7iQlZZS60g79QDdmA',
        'password': '789456',
        'beginAt': '2017-3-2',
        'endAt': '2017-8-3',
        'phone': '13425651435',
        'name': 'zhenyu',
        'sex': 'man',
        ownerHref: 'http://192.168.7.150:5027/api/v1.0.0/tenants/LQ7lVK4LzvZeDAa1ydy3ag/customerDirectorys/6f0gDCh3gy8QAKPXBpEdtA/customers/Hyh9P6DdMLL5BaSubP3oAw'
    };

    let directUrl = null;

    let memberCardUUID = null;

    directUrl = url + '/directorys/' + 'bvnD1NAHd1NgDZOnGQZR6w';
    let memberURL = directUrl;

    describe('create test case:', function () {
        it('success create an memberCard', function () {
            this.timeout(0);
            return request.postRequest(`${memberURL}/memberCards`, memberCardTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('memberCard test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                memberCardUUID = utils.getResourceUUIDInURL(body.href, 'memberCards');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an memberCard  ', function () {
            this.timeout(0);
            return request.getRequest(`${memberURL}/memberCards/${memberCardUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('memberCard test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success verifyPassword an memberCard  ', function () {
            this.timeout(0);
            memberCardUUID = 'VCkq5F7QPARzwnkAbnW1uQ';
            return request.postRequest(`${memberURL}/memberCards/${memberCardUUID}/verifyPassword`, { password: '123456' }).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('memberCard test verifyPassword   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an memberCard', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.email = 'ssdgsdg@153.com';
            return request.postRequest(`${memberURL}/memberCards/${memberCardUUID}`, updateInfo).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('memberCard test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list memberCards by memberCard:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${memberURL}/memberCards`, qs).then((_ref5) => {
                let res = _ref5.res,
                    body = _ref5.body;


                console.log('memberCard test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

        it('list memberCards by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/memberCards`, qs).then((_ref6) => {
                let res = _ref6.res,
                    body = _ref6.body;


                console.log('memberCard test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

        it('list memberCards by api:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${url}/memberCards`, qs).then((_ref7) => {
                let res = _ref7.res,
                    body = _ref7.body;


                console.log('memberCard test list by all   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an memberCard', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/memberCards/${memberCardUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});