/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('tradeRecord Test Case:',()=>{

    let tradeRecordTestCase = {
       // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'tradeType':'income',
        'tradeNo':'201714584',
        'tradeAmount':50.0,
        'balanceAmount':100.0,
        'tradeAt':'2017-9-5',
        'remark':'chongzhi',
    };



    let directoryUUID = null;
    let directUrl = null;

    let tradeRecordUUID =null;

    directUrl = url + '/bankAccounts/' + 'm5h6kAivoDa1EHPnJFFK5w';

    describe('create test case:',  function(){
        it('success create an tradeRecord',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/tradeRecords`,tradeRecordTestCase).then( ( { res, body} )=>{


                console.log('tradeRecord test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                tradeRecordUUID = utils.getResourceUUIDInURL(body.href,'tradeRecords');
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an tradeRecord  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/tradeRecords/${tradeRecordUUID}`).then( ( { res, body} )=>{

                console.log('tradeRecord test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an tradeRecord', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.accountId = '300012';
            return request.postRequest(`${directUrl}/tradeRecords/${tradeRecordUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('tradeRecord test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list tradeRecords by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/tradeRecords`,qs).then( ( { res, body} )=>{

                console.log('tradeRecord test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an tradeRecord', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/tradeRecords/${tradeRecordUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

