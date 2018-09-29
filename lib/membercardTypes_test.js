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

describe('memberCardType Test Case:', () => {

    let memberCardTypeTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        name: "黄金卡",
        cardTypeNo: '00',
        intergateRadio: 4,
        discountRadio: 0.6,
        consumerAmountLimit: 5000
    };

    let directoryUUID = null;
    let directUrl = null;

    let memberCardTypeUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an memberCardType', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/memberCardTypes`, memberCardTypeTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('memberCardType test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                memberCardTypeUUID = utils.getResourceUUIDInURL(body.href, 'memberCardTypes');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an memberCardType  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/memberCardTypes/${memberCardTypeUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('memberCardType test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an memberCardType', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.name = 'tttt brand';
            return request.postRequest(`${directUrl}/memberCardTypes/${memberCardTypeUUID}`, updateInfo).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('memberCardType test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list memberCardTypes by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/memberCardTypes`, qs).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('memberCardType test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an memberCardType', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/memberCardTypes/${memberCardTypeUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});