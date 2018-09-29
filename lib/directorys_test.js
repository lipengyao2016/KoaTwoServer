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

describe('Directory Test Case:', () => {

    let DirectoryTestCase = {
        // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        name: "direcotydd",
        merchantHref: 'http://localhost:5006/api/v1.0.0/merchants/DQZNqVpEbFxyZ7ayW7x2yA'
    };

    let directoryUUID = null;
    let directUrl = null;

    let DirectoryUUID = null;

    directUrl = url;

    describe('create test case:', function () {
        it('success create an Directory', function () {
            this.timeout(0);
            return request.postRequest(`${directUrl}/directorys`, DirectoryTestCase).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('Directory test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                DirectoryUUID = utils.getResourceUUIDInURL(body.href, 'directorys');
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an Directory  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/directorys/${DirectoryUUID}`).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('Directory test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an Directory', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.name = 'tttt brand';
            return request.postRequest(`${directUrl}/directorys/${DirectoryUUID}`, updateInfo).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('Directory test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list directorys by directory:', function () {
            this.timeout(0);
            let qs = {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/directorys`, qs).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('Directory test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('delete test case:', () => {
        it('success delete an Directory', function () {
            //this.timeout(0);
            /*   return request.deleteRequest(`${directUrl}/directorys/${DirectoryUUID}`).then( ( { res, body} )=>{
                   expect(res.statusCode).to.equal(204);
               });*/
        });
    });
});