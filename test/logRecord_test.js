/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('logRecord Test Case:',()=>{

    let logRecordTestCase = {
        "accountId": "4556",
        "logApp": "setting",
        "logAt": "2018-4-5 00:00:00",
    };



    let directoryUUID = null;
    let directUrl = null;

    let logRecordUUID =null;

    directUrl = url;

    describe('create test case:',  function(){
        it('success create an logRecord',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/logRecords`,logRecordTestCase).then( ( { res, body} )=>{


                console.log('logRecord test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                logRecordUUID = body.uuid;
            });
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an logRecord  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/logRecords/${logRecordUUID}`).then( ( { res, body} )=>{

                console.log('logRecord test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

    });
    describe('update test case:', function () {
        it('success update an logRecord', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.accountId = '333';
            return request.postRequest(`${directUrl}/logRecords/${logRecordUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('logRecord test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list logRecords by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/logRecords`,qs).then( ( { res, body} )=>{

                console.log('logRecord test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an logRecord', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/logRecords/${logRecordUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});
